declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
// declare module '*.vue' {
//   import { defineComponent } from 'vue'
//   const component: ReturnType<typeof defineComponent>
//   export default component
// }
