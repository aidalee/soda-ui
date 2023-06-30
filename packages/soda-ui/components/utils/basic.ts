import { ComponentPublicInstance } from 'vue'

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentInstance = ComponentPublicInstance<{}, any>
export type Numeric = number | string
export const inBrowser = typeof window !== 'undefined'
