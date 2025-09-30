export class Decoder {
  private config: VideoDecoderConfig | undefined

  private decoder: VideoDecoder | undefined

  private hasKeyFrame = false

  onDecode = (_frame: { img: ImageBitmap; timestamp: number }) => {}
  onError = (_e: DOMException) => {}

  constructor() {}

  init = (config: VideoDecoderConfig) => {
    this.destroy()
    this.config = { ...config }
    this.decoder = new VideoDecoder({
      output: async (frame: VideoFrame) => {
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
        this.onError && this.onError(e)
      }
    })
    this.decoder.configure(this.config)
  }

  destroy = () => {
    this.config = undefined
    this.decoder?.close()
    this.decoder = undefined
    this.hasKeyFrame = false
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
}
