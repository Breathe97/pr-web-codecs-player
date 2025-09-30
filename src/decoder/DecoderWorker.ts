import Worker from './index.worker.ts?worker'

export class Decoder {
  worker = new Worker()

  onDecode = (_frame: { img: ImageBitmap; timestamp: number }) => {}
  onError = (_e: DOMException) => {}

  constructor() {
    this.worker.onmessage = (e) => {
      const { action, data } = e.data
      if (action === 'onDecode') {
        this.onDecode(data)
      }
      if (action === 'onError') {
        this.onError(data)
      }
    }
  }

  init = (config: VideoDecoderConfig) => {
    this.worker.postMessage({ action: 'init', data: config })
  }

  destroy = () => {
    this.worker.postMessage({ action: 'destroy' })
  }

  decode = async (init: EncodedVideoChunkInit) => {
    this.worker.postMessage({ action: 'decode', data: init })
  }

  flush = () => {
    this.worker.postMessage({ action: 'flush' })
  }
}
