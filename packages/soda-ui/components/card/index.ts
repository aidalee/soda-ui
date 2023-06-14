import type { App } from 'vue'
import Card from './card'
// 具名导出
export { Card }
// 到导出插件
export default {
  install(app: App) {
    app.component(Card.name, Card)
  }
}
