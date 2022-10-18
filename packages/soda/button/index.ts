import type { App } from 'vue'
import SoButton from './src/button'

import { installComponent } from '../install'
import type { SodaUIOptions } from '../utils/global-config'
// 具名导出
export { SoButton }

// 导出插件
export default {
  install(app: App, options?: SodaUIOptions) {
    installComponent(app, SoButton, options)
  }
}
