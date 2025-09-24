import { CanvasRender } from './CanvasRender'

const render = new CanvasRender({
  onFrame: (data) => postMessage({ action: 'onFrame', data }),
  onError: (data) => postMessage({ action: 'onError', data }),
  debug: false
})

onmessage = (event) => {
  const { action, data } = event.data
  switch (action) {
    case 'init':
      {
        render.init(data)
      }
      break
    case 'destroy':
      {
        render.destroy()
      }
      break
    case 'push':
      {
        render.push(data)
      }
      break
  }
}
