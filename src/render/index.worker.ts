import { CanvasRender } from './CanvasRender'

const render = new CanvasRender()

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
    case 'setCut':
      {
        render.setCut(data)
      }
      break
  }
}
