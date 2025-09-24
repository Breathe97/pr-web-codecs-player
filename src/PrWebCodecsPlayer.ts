import { PrFetch } from './PrFetch'
import DemuxerWorker from './demuxer/index.worker.ts?worker'
import DecoderWorker from './decoder/index.worker.ts?worker'
import RenderWorker from './render/index.worker.ts?worker'
import { Header, Tag } from './demuxer/type'

export class PrWebCodecsPlayer {
  url: string | undefined

  prFetch = new PrFetch()

  demuxerWorker = new DemuxerWorker()
  decoderWorker = new DecoderWorker()
  renderWorker = new RenderWorker()

  canvas: HTMLCanvasElement | undefined

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
  onTag = (e: Tag) => {
    const { header, body } = e
    if (header.tagType !== 'audio') {
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: onTag.${header.tagType}.${header.timestamp}`, e.body)
    }
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
          const { avcPacketType } = body

          if (avcPacketType === 0) {
            const { codec = '', data: description } = body
            this.initDecoder({ codec, description })
          }
          if (avcPacketType === 1) {
            const { frameType, data } = body
            this.decoderWorker.postMessage({ action: 'decode', data: { type: frameType === 1 ? 'key' : 'delta', timestamp: timestamp * 1000, data } })
          }
        }
        break
    }
  }

  /**
   * 监听解码结果
   */
  onDecode = (e: VideoFrame) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: push`, e.timestamp)
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
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: error`, e.data)
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
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: initRender`, width, height)
    const offscreenCanvas = this.canvas.transferControlToOffscreen()
    this.renderWorker.postMessage({ action: 'init', data: { offscreenCanvas } }, [offscreenCanvas])
  }

  /**
   * 初始化
   */
  init = async ({ canvas }: { canvas?: HTMLCanvasElement }) => {
    this.initDemuxer()
    if (!canvas) {
      canvas = document.createElement('canvas')
    }
    this.canvas = canvas
    // 捕获画布流
    const stream = this.canvas.captureStream(25)
    return stream
  }

  /**
   * 开始播放
   */
  start = async (url: string) => {
    try {
      const res = await this.prFetch.get(url)
      const reader = res.body?.getReader()
      if (!reader) throw new Error('Reader is error.')
      window.count = 0
      while (true) {
        const { done, value } = await reader.read()
        // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: value`, value)
        if (value) {
          window.count++
          this.demuxerWorker.postMessage({ action: 'push', data: value })
        }
        if (window.count >= 7) {
          // break
        }
        if (done) break
      }
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: error`, error)
    }
  }

  /**
   * 停止
   */
  stop = () => {
    this.prFetch.stop()
    this.demuxerWorker.postMessage({ action: 'destroy' })
    this.renderWorker.postMessage({ action: 'destroy' })
  }
}
