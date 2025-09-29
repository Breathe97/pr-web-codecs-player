import { PrFetch } from './PrFetch'
import DemuxerWorker from './demuxer/index.worker.ts?worker'
import DecoderWorker from './decoder/index.worker.ts?worker'
import RenderWorker from './render/index.worker.ts?worker'
import { Header, TagBody } from './demuxer/type'
import * as protos from './protos/index'

// 解析自定义SEI信息
const parseSEI = (payload: Uint8Array) => {
  let index = 0

  let payloadType = 0
  while (true) {
    const num = payload[index]
    payloadType = payloadType + num
    index = index + 1
    if (num !== 0xff) break
  }

  let payloadSize = 0
  while (true) {
    const num = payload[index]
    payloadSize = payloadSize + num
    index = index + 1
    if (num !== 0xff) break
  }

  // 处理Type=5的user_data_unregistered
  if (payloadType === 5) {
    // UUID是user_data_unregistered的固定前缀，用于唯一标识业务角色（如直播房间ID、设备指纹等）。从Payload的第1个字节开始，连续读取16个字节（十六进制格式）
    const uuidBytes = payload.slice(index, index + 16)
    const arr = Array.from(uuidBytes, (item) => item.toString(16).padStart(2, '0'))
    const uuid = arr.join('')
    index = index + 16

    // 业务数据位于UUID之后，长度为Payload Size - 16
    const payloadDataLength = payloadSize - 16
    const payloadData = payload.slice(index, index + payloadDataLength)

    const res = protos.com.quick.voice.proto.SeiData.decode(payloadData)

    const { event = 0 } = res
    const data_remote = res.data

    let data

    switch (event) {
      case 0: // 布局事件
        {
          data = protos.com.quick.voice.proto.LayoutData.decode(res.data)
        }
        break
      case 1: // 自定义数据事件
        {
          data = protos.com.quick.voice.proto.CustomInfo.decode(res.data)
        }
        break
    }

    const result = { uuid, ...res, event, data_remote, data }

    return result
  }
}

export class PrWebCodecsPlayer {
  url: string | undefined

  prFetch = new PrFetch()

  demuxerWorker = new DemuxerWorker()
  decoderWorker = new DecoderWorker()
  renderWorker = new RenderWorker()

  canvas: HTMLCanvasElement | undefined

  stream: MediaStream | undefined

  count = 0

  constructor() {}

  /**
   * 监听媒体 header
   */
  onHeader = (e: Header) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->onHeader: e`, e)
  }

  /**
   * 监听媒体 tag
   */
  onTag = (e: any) => {
    const { header, body } = e
    const { tagType, timestamp } = header
    switch (tagType) {
      case 'script':
        {
          const { width, height, fps } = body as TagBody['script']
          this.initRender({ width, height, fps })
        }
        break
      case 'video':
        {
          const { avcPacketType, frameType, data, nalus = [] } = body as TagBody['video']
          if (avcPacketType === 0) {
            const { codec = '', data: description } = body as TagBody['video']
            this.initDecoder({ codec, description })
          }
          if (avcPacketType === 1) {
            const type = frameType === 1 ? 'key' : 'delta'

            for (const nalu of nalus) {
              const { header, payload } = nalu
              const { nal_unit_type } = header
              // 解析SEI
              if (nal_unit_type === 6) {
                const res = parseSEI(payload)

                // 布局事件
                if (res?.event === 0) {
                  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: res`, res)
                }
              }
            }
            this.decoderWorker.postMessage({ action: 'decode', data: { type, timestamp, data } })
          }
        }
        break
    }
  }

  /**
   * 监听解码结果
   */
  onDecode = (e: any) => {
    this.renderWorker.postMessage({ action: 'push', data: e })
  }

  /**
   * 初始化分离器
   */
  initDemuxer = () => {
    this.demuxerWorker.postMessage({ action: 'init' })
    this.demuxerWorker.onmessage = (e) => {
      const { action, data } = e.data
      if (action === 'onHeader') {
        this.onHeader(data)
      }
      if (action === 'onTag') {
        this.onTag(data)
      }
    }
  }

  /**
   * 初始化解码器
   */
  initDecoder = (config: VideoDecoderConfig) => {
    this.decoderWorker.postMessage({ action: 'init', data: config })
    this.decoderWorker.onmessage = (e) => {
      const { action, data } = e.data
      if (action === 'onDecode') {
        this.onDecode(data)
      }
      if (action === 'onError') {
        this.stop()
      }
    }
  }

  /**
   * 初始化渲染器
   */
  initRender = ({ width = 256, height = 256, fps = 25 } = {}) => {
    if (!this.canvas) return
    this.canvas.width = width
    this.canvas.height = height
    const offscreenCanvas = this.canvas.transferControlToOffscreen()
    this.renderWorker.postMessage({ action: 'init', data: { offscreenCanvas } }, [offscreenCanvas])
  }

  /**
   * 初始化
   */
  init = async ({ canvas }: { canvas?: HTMLCanvasElement }) => {
    this.stop()
    this.initDemuxer()
    if (!canvas) {
      canvas = document.createElement('canvas')
    }
    this.canvas = canvas
    // 捕获画布流
    this.stream = this.canvas.captureStream(25)
    return this.stream
  }

  /**
   * 开始播放
   */
  start = async (url: string) => {
    try {
      const res = await this.prFetch.get(url)
      const reader = res.body?.getReader()
      if (!reader) throw new Error('Reader is error.')
      this.count = 0
      while (true) {
        const { done, value } = await reader.read()
        if (value) {
          this.count = this.count + 1
          this.demuxerWorker.postMessage({ action: 'push', data: value })
        }

        if (done) {
          this.demuxerWorker.postMessage({ action: 'flush', data: value })
          break
        }

        if (this.count >= 18) {
          // break
        }
      }
    } catch (error) {
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: error`, error)
    }
  }

  /**
   * 停止
   */
  stop = () => {
    this.prFetch.stop()
    this.demuxerWorker.postMessage({ action: 'destroy' })
    this.decoderWorker.postMessage({ action: 'destroy' })
    this.renderWorker.postMessage({ action: 'destroy' })
    const tracks = this.stream?.getTracks() || []
    for (const track of tracks) {
      track.enabled = false
      track.stop()
    }
  }
}
