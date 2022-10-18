import type { App, Plugin } from 'vue'
import * as components from './components'
import version from './version'

const SodaUI = {
  version,
  install(app: App) {
    Object.keys(components).forEach(key => {
      const Component = components[key as keyof typeof components]
      console.log(Component, 'Component')
      // 遍历可能有别的对象，只对插件执行use方法
      if ('install' in Component || typeof Component === 'function') {
        console.log('install', Component)
        app.use(Component as Plugin)
      }
    })
  }
}

export default SodaUI
