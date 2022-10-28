import Button, * as ButtonModule from './button'
import List, * as ListModule from './list'
import Tag, * as TagModule from './tag'

export const _ButtonComponent = ButtonModule._ButtonComponent || {}
export const _ListComponent = ListModule._ListComponent || {}
export const _TagComponent = TagModule._TagComponent || {}


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
