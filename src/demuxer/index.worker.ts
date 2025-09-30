import { Demuxer } from './Demuxer'

interface WorkerMessage {
  action: 'init' | 'destroy' | 'push'
  data: any
}

const demuxer = new Demuxer()

demuxer.onHeader = (data) => postMessage({ action: 'onHeader', data })
demuxer.onTag = (data) => postMessage({ action: 'onTag', data })

onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { action, data } = event.data
  const func = demuxer[action]
  func && func(data)
}
