import type { App } from 'vue'
import Tag from './src/tag'

// import { installComponent } from '../install'
// import type { SodaUIOptions } from '../utils/global-config'
// 具名导出
export { Tag }

// 导出插件
// export default {
//   install(app: App, options?: SodaUIOptions) {
//     installComponent(app, Tag, options)
//   }
// }
export default {
  install(app: App) {
    app.component('SoTag', Tag)
  }
}
