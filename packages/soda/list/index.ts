import { App } from 'vue'
import List from './src/list'
import { installComponent } from '../install'
import type { SodaUIOptions } from '../utils/global-config'

// 具名导出
export { List }

// 导出插件
export default {
  install(app: App, options?: SodaUIOptions) {
    installComponent(app, List, options)
  }
}
