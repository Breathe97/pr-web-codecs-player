export interface Options {
  onDecode?: (data: VideoFrame) => void
  onError?: (data: DOMException) => void
  debug?: boolean
}

export class WCSDecoder {
  private decoder: VideoDecoder | undefined

  private onDecode
  private onError

  debug = false

  constructor({ onDecode, onError, debug = false }: Options) {
    this.onDecode = onDecode
    this.onError = onError
    this.debug = debug
  }

  init = (config: VideoDecoderConfig) => {
    this.decoder = new VideoDecoder({
      output: (e: VideoFrame) => {
        this.onDecode && this.onDecode(e)
      },
      error: (e) => {
        console.error('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->WCSDecoder: error`, e)
        this.onError && this.onError(e)
      }
    })
    this.decoder.configure(config)
  }

  decode = async (init: EncodedVideoChunkInit) => {
    const chunk = new EncodedVideoChunk(init)
    // if (init.type === 'key') {
    //   await this.decoder?.flush()
    // }
    this.decoder?.decode(chunk)
  }

  destroy = () => {
    this.decoder?.close()
    this.decoder = undefined
  }
}
