import { Demuxer } from './Demuxer'

const demuxer = new Demuxer({
  onHeader: (data) => postMessage({ action: 'onHeader', data }),
  onTag: (data) => postMessage({ action: 'onTag', data }),
  debug: false
})

onmessage = (event) => {
  const { action, data } = event.data
  switch (action) {
    case 'init':
      {
        demuxer.init()
      }
      break
    case 'destroy':
      {
        demuxer.destroy()
      }
      break
    case 'push':
      {
        demuxer.push(data)
      }
      break
  }
}
