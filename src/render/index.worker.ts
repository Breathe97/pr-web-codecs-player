import { CanvasRender } from './CanvasRender'

const render = new CanvasRender({
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
