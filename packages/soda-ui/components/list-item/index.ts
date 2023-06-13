import type { App } from 'vue'
import ListItem from './list-item'

// ListItem.install = function (app: App) {
//   app.component(ListItem.name, ListItem)
// }

// export const _ListItemComponent = ListItem
export { ListItem }
// 导出插件
export default {
  install(app: App) {
    app.component(ListItem.name, ListItem)
  }
}
