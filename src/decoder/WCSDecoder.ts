export interface Options {
  onDecode?: (data: { img: ImageBitmap; timestamp: number }) => void
  onError?: (data: DOMException) => void
  debug?: boolean
}

export class WCSDecoder {
  private decoder: VideoDecoder | undefined

  config: VideoDecoderConfig | undefined

  hasKeyFrame = false

  private onDecode
  private onError

  debug = false

  constructor({ onDecode, onError, debug = false }: Options) {
    this.onDecode = onDecode
    this.onError = onError
    this.debug = debug
  }

  init = (config: VideoDecoderConfig) => {
    this.config = { ...config }
    this.hasKeyFrame = false
    this.decoder = new VideoDecoder({
      output: async (frame: VideoFrame) => {
        // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: frame`, frame)
        const img = await createImageBitmap(frame)
        const timestamp = frame.timestamp
        frame.close()
        if (img.width > 0 && img.height > 0) {
          this.onDecode && this.onDecode({ img, timestamp })
        } else {
          img.close()
        }
      },
      error: (e) => {
        console.error('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->WCSDecoder: error`, e)
        // this.config && this.init(this.config)
        this.onError && this.onError(e)
      }
    })
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: configure`, this.config)
    this.decoder.configure(this.config)
  }

  decode = async (init: EncodedVideoChunkInit) => {
    if (!this.decoder) return
    if (init.type === 'key') {
      this.hasKeyFrame = true
    }
    if (this.hasKeyFrame && this.decoder.decodeQueueSize < 2) {
      const chunk = new EncodedVideoChunk(init)
      this.decoder.decode(chunk)
    }
  }

  flush = () => {
    this.decoder?.flush()
  }

  destroy = () => {
    this.decoder?.close()
    this.decoder = undefined
    this.hasKeyFrame = false
  }
}
