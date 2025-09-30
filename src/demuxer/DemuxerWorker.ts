import Worker from './index.worker.ts?worker&inline' // 在生产环境中，可能会遇到 MIME type is text/html 的错误。可以通过添加 ?inline 参数避免单独生成 Worker 文件。
import { Header, Tag } from './type'

export class DemuxerWorker {
  worker = new Worker()

  onHeader = (_header: Header) => {}
  onTag = (_tag: Tag<'script' & 'audio' & 'video'>) => {}

  constructor() {
    this.worker.onmessage = (e) => {
      const { action, data } = e.data
      if (action === 'onHeader') {
        this.onHeader(data)
      }
      if (action === 'onTag') {
        this.onTag(data)
      }
    }
  }

  init = () => {
    this.worker.postMessage({ action: 'init' })
  }

  destroy = () => {
    this.worker.postMessage({ action: 'destroy' })
  }

  push = (payload: Uint8Array) => {
    this.worker.postMessage({ action: 'push', data: payload })
  }
}
