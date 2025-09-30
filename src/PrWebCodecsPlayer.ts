import { PrFetch } from './PrFetch'
import DemuxerWorker from './demuxer/index.worker.ts?worker'
import DecoderWorker from './decoder/index.worker.ts?worker'
import RenderWorker from './render/index.worker.ts?worker'
import { Header, TagBody } from './demuxer/type'

export class PrWebCodecsPlayer {
  url: string | undefined

  prFetch = new PrFetch()

  demuxerWorker = new DemuxerWorker()
  decoderWorker = new DecoderWorker()
  renderWorker = new RenderWorker()

  canvas: HTMLCanvasElement | undefined

  stream: MediaStream | undefined

  count = 0

  cutMap = new Map<string, { dx: number; dy: number; dw: number; dh: number; canvas: HTMLCanvasElement; stream: MediaStream }>()

  onCut = (_key: string, _stream: MediaStream, _dw: number, _dh: number) => {}
  onSEI = (_payload: Uint8Array) => {}

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
            this.decoderWorker.postMessage({ action: 'decode', data: { type, timestamp, data } })

            for (const nalu of nalus) {
              const { header, payload } = nalu
              const { nal_unit_type } = header
              // 解析SEI
              if (nal_unit_type === 6) {
                // const e = new CustomEvent('sei', { detail: { payload } })
                // this.dispatchEvent(e)
                this.onSEI(payload)
              }
            }
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

  addCut = async (key: string, dx: number, dy: number, dw: number, dh: number) => {
    const had = () => {
      const info = this.cutMap.get(key)
      if (info && info.dw === dw && info.dh === dh && info.dx === dx && info.dy === dy) return true
      return false
    }

    const isHad = had()

    // 检查是否已经存在
    if (isHad) return

    const canvas = document.createElement('canvas')
    canvas.width = dw
    canvas.height = dh

    const offscreenCanvas = canvas.transferControlToOffscreen()
    this.renderWorker.postMessage({ action: 'setCut', data: { key, dx, dy, dw, dh, offscreenCanvas } }, [offscreenCanvas])
    // 捕获画布流
    const stream = canvas.captureStream(25)
    this.cutMap.set(key, { dw, dh, dx, dy, canvas, stream })
    this.onCut(key, stream, dw, dh)
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
