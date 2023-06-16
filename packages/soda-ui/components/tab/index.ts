import type { App } from 'vue'
import Tab from './tab'
export { Tab }
export default {
  install(app: App) {
    app.component(Tab.name, Tab)
  }
}
