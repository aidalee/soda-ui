import Button, * as ButtonModule from './button'
import List, * as ListModule from './list'
import ListItem, * as ListItemModule from './list-item'
import Tag, * as TagModule from './tag'

import './button/style'
import './list/style'
import './list-item/style'
import './tag/style'


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
