import Worker from './index.worker.ts?worker'
import { Header, Tag } from './type'

export class Demuxer {
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
