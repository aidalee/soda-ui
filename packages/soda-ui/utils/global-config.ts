import { getCurrentInstance } from 'vue'
import type { App } from 'vue'

const CLASS_PREFIX = 'so'
const GLOBAL_CONFIG_NAME = '_soda'
const COMPONENT_PREFIX = 'So'
export interface SodaUIOptions {
  classPrefix?: string
  componentPrefix?: string
}

// 注入全局app属性
export const setGlobalConfig = (
  app: App,
  options: SodaUIOptions = { classPrefix: CLASS_PREFIX }
) => {
  app.config.globalProperties[GLOBAL_CONFIG_NAME] = {
    ...(app.config.globalProperties[GLOBAL_CONFIG_NAME] ?? {}),
    classPrefix: options.classPrefix
  }
}

// 获取组件name的prefix
export const getComponentPrefix = (options?: SodaUIOptions): string =>
  options?.componentPrefix ?? COMPONENT_PREFIX

// 获取组件class类
export const getComponentCls = (componentName?: string): string => {
  const instance = getCurrentInstance()

  const prefix =
    instance?.appContext.config.globalProperties[GLOBAL_CONFIG_NAME]
      ?.classPrefix ?? CLASS_PREFIX

  if (componentName) {
    console.log(prefix)
    return `${prefix}-${componentName}`
  }

  return 'prefix'
}
