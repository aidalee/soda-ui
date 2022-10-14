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

interface ImportMetaEnv {
  readonly VITE_API_TIMEOUT: number
  readonly VITE_MOCKUP: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
