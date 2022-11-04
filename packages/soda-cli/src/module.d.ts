declare module '@babel/helper-plugin-utils'
declare module 'execa'
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
