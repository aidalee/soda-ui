import type { App } from 'vue'
import Sticky from './sticky'
export { Sticky }
export default {
  install(app: App) {
    app.component(Sticky.name, Sticky)
  }
}
