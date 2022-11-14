import Button, * as ButtonModule from './button'
import List, * as ListModule from './list'
import ListItem, * as ListItemModule from './list-item'
import Tag, * as TagModule from './tag'

export const _ButtonComponent = ButtonModule._ButtonComponent || {}
export const _ListComponent = ListModule._ListComponent || {}
export const _ListItemComponent = ListItemModule._ListItemComponent || {}
export const _TagComponent = TagModule._TagComponent || {}


    function install(app) {
      Button.install && app.use(Button)
  List.install && app.use(List)
  ListItem.install && app.use(ListItem)
  Tag.install && app.use(Tag)
    }
  
export {
  install,
  Button,
  List,
  ListItem,
  Tag
}
export default {
  install,
  Button,
  List,
  ListItem,
  Tag
}
