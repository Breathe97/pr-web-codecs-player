import { WCSDecoder } from './WCSDecoder'

const decoder = new WCSDecoder({
  onDecode: (data) => postMessage({ action: 'onDecode', data }),
  onError: (data) => postMessage({ action: 'onError', data }),
  debug: false
})

onmessage = (event) => {
  const { action, data } = event.data
  switch (action) {
    case 'init':
      {
        decoder.init(data)
      }
      break
    case 'destroy':
      {
        decoder.destroy()
      }
      break
    case 'decode':
      {
        decoder.decode(data)
      }
      break
  }
}
