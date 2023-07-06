import type { App } from 'vue'
import ImageUpload from './upload'

export { ImageUpload }
// 导出插件
export default {
  install(app: App) {
    app.component(ImageUpload.name, ImageUpload)
  }
}
