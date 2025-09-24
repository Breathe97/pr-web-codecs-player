export interface Options {
  debug?: boolean
}

export class CanvasRender {
  private underflow = true
  private pendingFrames: VideoFrame[] = []
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

  push = (frame: VideoFrame) => {
    this.pendingFrames.push(frame)
    if (this.underflow) setTimeout(this.renderFrame, 0)
  }

  calculateTimeUntilNextFrame = (timestamp: number) => {
    if (this.baseTime == 0) this.baseTime = performance.now()
    let mediaTime = performance.now() - this.baseTime
    return Math.max(0, timestamp / 1000 - mediaTime)
  }

  renderFrame = async () => {
    this.underflow = this.pendingFrames.length == 0
    if (this.underflow) return
    if (!this.ctx || !this.offscreenCanvas) return

    const frame = this.pendingFrames.shift()
    if (frame) {
      const timeUntilNextFrame = this.calculateTimeUntilNextFrame(frame.timestamp)
      await new Promise((r) => setTimeout(r, timeUntilNextFrame))
      this.ctx.drawImage(frame, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height)
      frame.close()
      setTimeout(this.renderFrame, 0)
    }
  }

  destroy = () => {}
}
