import { App } from 'vue'
import Icon from './src/icon'
import { installComponent } from '../install'
import type { SodaUIOptions } from '../utils/global-config'

// 具名导出
export { Icon }

// 导出插件
export default {
  install(app: App, options?: SodaUIOptions) {
    installComponent(app, Icon, options)
  }
}
