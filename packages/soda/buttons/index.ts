import type { App } from 'vue'
import Buttons from './src/buttons'

import { installComponent } from '../install'
import type { SodaUIOptions } from '../utils/global-config'
// 具名导出
export { Buttons }

// 导出插件
export default {
  install(app: App, options?: SodaUIOptions) {
    installComponent(app, Buttons, options)
  }
}
