import Button, * as ButtonModule from './button'
import Field, * as FieldModule from './field'
import Icon, * as IconModule from './icon'
import List, * as ListModule from './list'
import ListItem, * as ListItemModule from './list-item'
import Tag, * as TagModule from './tag'

import './button/style'
import './field/style'
import './icon/style'
import './list/style'
import './list-item/style'
import './tag/style'


    function install(app) {
      Button.install && app.use(Button)
  Field.install && app.use(Field)
  Icon.install && app.use(Icon)
  List.install && app.use(List)
  ListItem.install && app.use(ListItem)
  Tag.install && app.use(Tag)
    }
  
export {
  install,
  Button,
  Field,
  Icon,
  List,
  ListItem,
  Tag
}
export default {
  install,
  Button,
  Field,
  Icon,
  List,
  ListItem,
  Tag
}
