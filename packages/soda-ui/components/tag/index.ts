import type { App } from 'vue'
import Tag from './tag'

Tag.install = function (app: App) {
  app.component(Tag.name, Tag)
}

export const _TagComponent = Tag
export default Tag
