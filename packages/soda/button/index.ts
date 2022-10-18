import type { App } from 'vue'
import Button from './src/button'

import { installComponent } from '../install'
import type { SodaUIOptions } from '../utils/global-config'
// 具名导出
export { Button as SoButton }

// 导出插件
export default {
  install(app: App, options?: SodaUIOptions) {
    installComponent(app, Button, options)
  }
}
