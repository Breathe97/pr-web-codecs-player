import Worker from './index.worker.ts?worker'
import { CutOption } from './type'

export class Render {
  worker = new Worker()

  constructor() {}

  setCut = async (cutOption: CutOption) => {
    this.worker.postMessage({ action: 'setCut', data: cutOption })
  }

  init = ({ offscreenCanvas }: { offscreenCanvas: OffscreenCanvas }) => {
    this.worker.postMessage({ action: 'init', data: { offscreenCanvas } }, [offscreenCanvas])
  }

  destroy = () => {
    this.worker.postMessage({ action: 'destroy', data: {} })
  }

  push = (frame: { img: ImageBitmap; timestamp: number }) => {
    this.worker.postMessage({ action: 'push', data: frame })
  }
}
