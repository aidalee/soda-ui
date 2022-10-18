// 入口文件
// 1. 引入已实现的组件批量导出去
import type { App } from 'vue'
import ButtonPlugin, { SoButton } from '../packages/soda/button'
import ListPlugin, { SoList, SoListItem } from '../packages/soda/list'
const version = require('../package.json').version

// 2. 导出这些组件
export { SoButton, SoList, SoListItem }

const installs = [ButtonPlugin, ListPlugin]

// 3.导出一个vue插件
export default {
  version,
  install(app: App) {
    installs.forEach(p => app.use(p))
  }
}
