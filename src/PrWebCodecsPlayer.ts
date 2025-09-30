import { Demuxer as DemuxerWorker } from './demuxer/DemuxerWorker'
import { Decoder as DecoderWorker } from './decoder/DecoderWorker'
import { Render as RenderWorker } from './render/RenderWorker'

import { PrFetch } from 'pr-fetch'

export class PrWebCodecsPlayer {
  url: string | undefined

  prFetch = new PrFetch()

  demuxerWorker = new DemuxerWorker()
  decoderWorker = new DecoderWorker()
  renderWorker = new RenderWorker()

  canvas: HTMLCanvasElement | undefined

  stream: MediaStream | undefined

  count = 0

  onCut = (_key: string, _stream: MediaStream, _dw: number, _dh: number) => {}
  onSEI = (_payload: Uint8Array) => {}

  constructor() {}

  /**
   * 监听媒体 tag
   */
  onTag = (e: any) => {
    const { header, body } = e
    const { tagType, timestamp } = header
    switch (tagType) {
      case 'script':
        {
          const { width, height, fps } = body
          this.initRender({ width, height, fps })
        }
        break
      case 'video':
        {
          const { avcPacketType, frameType, data, nalus = [] } = body
          if (avcPacketType === 0) {
            const { codec = '', data: description } = body
            this.initDecoder({ codec, description })
          }
          if (avcPacketType === 1) {
            const type = frameType === 1 ? 'key' : 'delta'
            this.decoderWorker.decode({ type, timestamp, data })

            for (const nalu of nalus) {
              const { header, payload } = nalu
              const { nal_unit_type } = header
              // 解析SEI
              if (nal_unit_type === 6) {
                this.onSEI(payload)
              }
            }
          }
        }
        break
    }
  }

  /**
   * 初始化分离器
   */
  initDemuxer = () => {
    this.demuxerWorker.init()
    this.demuxerWorker.onTag = this.onTag
  }

  /**
   * 初始化解码器
   */
  initDecoder = (config: VideoDecoderConfig) => {
    this.decoderWorker.init(config)
    this.decoderWorker.onDecode = (e) => {
      this.renderWorker.push(e)
    }
    this.decoderWorker.onError = (e) => {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->decoderWorker.onError: e`, e)
      this.stop()
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
    this.renderWorker.init({ offscreenCanvas })
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
      const res = await this.prFetch.request(url)
      const reader = res.body?.getReader()
      if (!reader) throw new Error('Reader is error.')
      this.count = 0
      while (true) {
        const { done, value } = await reader.read()
        if (value) {
          this.count = this.count + 1
          this.demuxerWorker.push(value)
        }

        if (done) {
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
    this.demuxerWorker.destroy()
    this.decoderWorker.destroy()
    this.renderWorker.destroy()
    const tracks = this.stream?.getTracks() || []
    for (const track of tracks) {
      track.enabled = false
      track.stop()
    }
  }
}
