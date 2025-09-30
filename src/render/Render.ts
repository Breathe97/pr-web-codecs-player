import { CutOption } from './type'

export class Render {
  private isRendering = false
  private pendingFrames: { img: ImageBitmap; timestamp: number }[] = []
  private baseTime = 0

  private offscreenCanvas: OffscreenCanvas | undefined

  private ctx: OffscreenCanvasRenderingContext2D | null | undefined

  private cutOption: CutOption = {}

  constructor() {}

  setCut = async (cutOption: CutOption) => {
    this.cutOption = { ...this.cutOption, ...cutOption }
  }

  init = ({ offscreenCanvas }: { offscreenCanvas: OffscreenCanvas }) => {
    this.destroy()
    this.offscreenCanvas = offscreenCanvas
    this.ctx = this.offscreenCanvas.getContext('2d')
  }

  destroy = () => {
    this.isRendering = false
    this.pendingFrames = []
    this.baseTime = 0
    this.offscreenCanvas = undefined
    this.ctx = undefined
  }

  push = (frame: { img: ImageBitmap; timestamp: number }) => {
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

    const { sx = 0, sy = 0, sw = img.width, sh = img.height } = this.cutOption
    const cutImg = await createImageBitmap(img, sx, sy, sw, sh)

    const timeUntilNextFrame = this.calculateTimeUntilNextFrame(timestamp)
    await new Promise((r) => setTimeout(r, timeUntilNextFrame))
    this.ctx.drawImage(cutImg, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height)

    img.close()
    cutImg.close()
    setTimeout(this.renderFrame, 0)
  }
}
