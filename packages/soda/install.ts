import { setGlobalConfig, getComponentPrefix } from './utils/global-config'
import type { SodaUIOptions } from './utils/global-config'
import type { App } from 'vue'

type ComponentType = any

export function installComponent(
  app: App,
  component: ComponentType,
  options?: SodaUIOptions
) {
  const componentPrefix = getComponentPrefix(options)
  const registered = app.component(componentPrefix + component.name)

  if (!registered) {
    setGlobalConfig(app, options)
    console.log('====', componentPrefix + component.name)
    app.component(componentPrefix + component.name, component)
  }
}
