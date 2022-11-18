import type { App } from 'vue'
import Icon from './icon.vue'

Icon.install = function (app: App) {
  app.component(Icon.name as string, Icon)
}

export const _IconComponent = Icon

export default Icon
