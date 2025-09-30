interface CutOption {
  key: string
  dx: number
  dy: number
  dw: number
  dh: number
  offscreenCanvas: OffscreenCanvas
  ctx: OffscreenCanvasRenderingContext2D
}

export class CanvasRender {
  private isRendering = false
  private pendingFrames: { img: ImageBitmap; timestamp: number }[] = []
  private baseTime = 0

  private offscreenCanvas: OffscreenCanvas | undefined

  private ctx: OffscreenCanvasRenderingContext2D | null | undefined

  debug = false

  private cutMap = new Map<string, CutOption>()

  constructor() {}

  setCut = async (cutOption: Omit<CutOption, 'ctx'>) => {
    const { key, offscreenCanvas } = cutOption

    const ctx = offscreenCanvas.getContext('2d')
    if (!ctx) return

    this.cutMap.set(key, { ...cutOption, ctx })
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
    // 绘制剪切
    {
      const cuts = [...this.cutMap.values()]
      for (const cut of cuts) {
        const { ctx, dx, dy, dw, dh, offscreenCanvas } = cut
        const cutImg = await createImageBitmap(img, dx, dy, dw, dh)
        ctx.drawImage(cutImg, 0, 0, offscreenCanvas.width, offscreenCanvas.height)
      }
    }

    img.close()
    setTimeout(this.renderFrame, 0)
  }
}
