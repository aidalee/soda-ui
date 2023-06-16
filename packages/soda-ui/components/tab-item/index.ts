import type { App } from 'vue'
import TabItem from './tab-item'
export { TabItem }
export default {
  install(app: App) {
    app.component(TabItem.name, TabItem)
  }
}
