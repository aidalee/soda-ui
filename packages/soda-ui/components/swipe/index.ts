import type { App } from 'vue'
import Swipe from './swipe'

export { Swipe }

export default {
  install(app: App) {
    app.component(Swipe.name, Swipe)
  }
}
