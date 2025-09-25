export interface Options {
  onDecode?: (data: VideoFrame) => void
  onError?: (data: DOMException) => void
  debug?: boolean
}

export class WCSDecoder {
  private decoder: VideoDecoder | undefined

  config: VideoDecoderConfig | undefined

  private onDecode
  private onError

  debug = false

  constructor({ onDecode, onError, debug = false }: Options) {
    this.onDecode = onDecode
    this.onError = onError
    this.debug = debug
  }

  init = (config: VideoDecoderConfig) => {
    this.config = config
    this.decoder = new VideoDecoder({
      output: (e: VideoFrame) => {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: output`, e)
        this.onDecode && this.onDecode(e)
      },
      error: (e) => {
        console.error('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->WCSDecoder: error`, e)
        this.onError && this.onError(e)
      }
    })
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: config`, config)
    this.decoder.configure(config)
  }

  decode = async (init: EncodedVideoChunkInit) => {
    if (!this.decoder) return
    const chunk = new EncodedVideoChunk(init)
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: this.decoder.decodeQueueSize`, this.decoder.decodeQueueSize)
    if (this.decoder.decodeQueueSize < 2) {
      this.decoder.decode(chunk)
    }
  }

  flush = () => {
    this.decoder?.flush()
  }

  destroy = () => {
    this.decoder?.close()
    this.decoder = undefined
  }
}
