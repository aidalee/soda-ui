import type { App } from 'vue'
import SwipeItem from './swipe-item'

export { SwipeItem }

export default {
  install(app: App) {
    app.component(SwipeItem.name, SwipeItem)
  }
}
