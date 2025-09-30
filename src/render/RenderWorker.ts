import Worker from './index.worker.ts?worker&inline' // 在生产环境中，可能会遇到 MIME type is text/html 的错误。可以通过添加 ?inline 参数避免单独生成 Worker 文件。
import { CutOption } from './type'

export class Render {
  worker = new Worker()

  constructor() {}

  setCut = async (cutOption: CutOption) => {
    this.worker.postMessage({ action: 'setCut', data: cutOption })
  }

  init = (offscreenCanvas: OffscreenCanvas) => {
    this.worker.postMessage({ action: 'init', data: offscreenCanvas }, [offscreenCanvas])
  }

  destroy = () => {
    this.worker.postMessage({ action: 'destroy', data: {} })
  }

  push = (frame: { img: ImageBitmap; timestamp: number }) => {
    this.worker.postMessage({ action: 'push', data: frame })
  }
}
