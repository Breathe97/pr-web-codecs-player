export interface Options {
  debug?: boolean
}

export class CanvasRender {
  private isRendering = false
  // private pendingFrames: VideoFrame[] = []
  private pendingFrames: { img: ImageBitmap; timestamp: number }[] = []
  private baseTime = 0

  offscreenCanvas: OffscreenCanvas | undefined

  ctx: OffscreenCanvasRenderingContext2D | null | undefined | CanvasRenderingContext2D

  debug = false

  constructor({ debug = false }: Options) {
    this.debug = debug
  }

  init = ({ offscreenCanvas }: { offscreenCanvas: OffscreenCanvas }) => {
    this.offscreenCanvas = offscreenCanvas
    this.ctx = this.offscreenCanvas.getContext('2d')
  }

  push = (frame: { img: ImageBitmap; timestamp: number }) => {
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->frame: ${frame.timestamp}`, frame.img)
    this.pendingFrames.push(frame)
    if (this.isRendering === false) {
      setTimeout(this.renderFrame, 0)
    }
  }

  calculateTimeUntilNextFrame = (timestamp: number) => {
    if (this.baseTime == 0) this.baseTime = performance.now()
    let mediaTime = performance.now() - this.baseTime
    return Math.max(0, timestamp / 1000 - mediaTime)
  }

  renderFrame = async () => {
    if (!this.ctx || !this.offscreenCanvas) return
    const frame = this.pendingFrames.shift()

    this.isRendering = Boolean(frame)
    if (!frame) {
      this.isRendering = false
      return
    }

    this.isRendering = true
    const { img, timestamp } = frame
    const timeUntilNextFrame = this.calculateTimeUntilNextFrame(timestamp)
    await new Promise((r) => setTimeout(r, timeUntilNextFrame))
    this.ctx.drawImage(img, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height)
    img.close()
    setTimeout(this.renderFrame, 0)
  }

  destroy = () => {}
}
