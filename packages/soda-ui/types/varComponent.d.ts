import type { App } from 'vue'

export class VarComponent {
  static name: string
  static install(app: App): void
}

export type Type = 'primary' | 'success' | 'warning' | 'error' | 'default'

export type Size = 'large' | 'middle' | 'small'

export type shape = 'round' | 'circle'

export interface BasicAttributes {
  class?: string | Record<string, any>
  style?: string | Record<string, any>
}
