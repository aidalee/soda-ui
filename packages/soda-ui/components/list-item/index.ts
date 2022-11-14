import type { App } from 'vue'
import ListItem from './list-item'

ListItem.install = function (app: App) {
  app.component(ListItem.name, ListItem)
}

export const _ListItemComponent = ListItem
export default ListItem
