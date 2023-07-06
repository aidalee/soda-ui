// 入口文件
// 1. 引入已实现的组件批量导出去
import type { App } from 'vue'
import ButtonPlugin, { Button } from '../packages/soda-ui/components/button'
import ListPlugin, { List } from '../packages/soda-ui/components/list'
import ListItemPlugin, {
  ListItem
} from '../packages/soda-ui/components/list-item'

import TagPlugin, { Tag } from '../packages/soda-ui/components/tag'
import CardPlugin, { Card } from '../packages/soda-ui/components/card'
import TabPlugin, { Tab } from '../packages/soda-ui/components/tab'
import TabItemPlugin, { TabItem } from '../packages/soda-ui/components/tab-item'
import StickyPlugin, { Sticky } from '../packages/soda-ui/components/sticky'
import ImageUploadPlugin, {
  ImageUpload
} from '../packages/soda-ui/components/image-upload'

const version = require('../package.json').version

// 2. 导出这些组件
export { Button, List, ListItem, Tag, Card, Tab, TabItem, Sticky, ImageUpload }

const installs = [
  ButtonPlugin,
  ListPlugin,
  TagPlugin,
  ListItemPlugin,
  CardPlugin,
  TabPlugin,
  TabItemPlugin,
  StickyPlugin,
  ImageUploadPlugin
]

// 3.导出一个vue插件
export default {
  version,
  install(app: App) {
    installs.forEach(p => app.use(p))
  }
}
