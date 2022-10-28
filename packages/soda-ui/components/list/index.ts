import type { App } from 'vue'
import List from './src/list'
import ListItem from './src/list-item'
import { installComponent } from '../../install'
import type { SodaUIOptions } from '../../utils/global-config'

// 具名导出
export { List, ListItem }

// 导出插件
export default {
  install(app: App, options?: SodaUIOptions) {
    installComponent(app, List, options)
    installComponent(app, ListItem, options)
  }
}
