import type { App } from 'vue'
import Field from './field'

// Field.install = function (app: App) {
//   app.component(Field.name, Field)
// }

// export const _FieldComponent = Field
export { Field }
// 导出插件
export default {
  install(app: App) {
    app.component(Field.name, Field)
  }
}
