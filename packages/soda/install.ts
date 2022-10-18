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
  console.log('componentPrefix', componentPrefix, component.name)
  const registered = app.component(componentPrefix + component.name)

  if (!registered) {
    console.log('reging')
    setGlobalConfig(app, options)
    console.log('reged')
    app.component(componentPrefix + component.name, component)
  }
}
