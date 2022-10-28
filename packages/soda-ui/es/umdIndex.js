import Button, * as ButtonModule from './button'
import List, * as ListModule from './list'
import Tag, * as TagModule from './tag'

import './button/style'
import './list/style'
import './tag/style'


    function install(app) {
      Button.install && app.use(Button)
  List.install && app.use(List)
  Tag.install && app.use(Tag)
    }
  
export {
  install,
  Button,
  List,
  Tag
}
export default {
  install,
  Button,
  List,
  Tag
}
