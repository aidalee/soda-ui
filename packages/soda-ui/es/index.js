import Button, * as ButtonModule from './button'
import Card, * as CardModule from './card'
import Field, * as FieldModule from './field'
import Icon, * as IconModule from './icon'
import List, * as ListModule from './list'
import ListItem, * as ListItemModule from './list-item'
import Tag, * as TagModule from './tag'

export const _ButtonComponent = ButtonModule._ButtonComponent || {}
export const _CardComponent = CardModule._CardComponent || {}
export const _FieldComponent = FieldModule._FieldComponent || {}
export const _IconComponent = IconModule._IconComponent || {}
export const _ListComponent = ListModule._ListComponent || {}
export const _ListItemComponent = ListItemModule._ListItemComponent || {}
export const _TagComponent = TagModule._TagComponent || {}


    function install(app) {
      Button.install && app.use(Button)
  Card.install && app.use(Card)
  Field.install && app.use(Field)
  Icon.install && app.use(Icon)
  List.install && app.use(List)
  ListItem.install && app.use(ListItem)
  Tag.install && app.use(Tag)
    }
  
export {
  install,
  Button,
  Card,
  Field,
  Icon,
  List,
  ListItem,
  Tag
}
export default {
  install,
  Button,
  Card,
  Field,
  Icon,
  List,
  ListItem,
  Tag
}
