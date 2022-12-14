import type { App } from 'vue'

export const install: (app: App) => void

export * from './button'
export * from './icon'
export * from './list-item'
export * from './list'
export * from './varComponent'

declare module 'vue' {
  export interface GlobalComponents {
    SoButton: typeof import('@soda-f2e/ui')['_ButtonComponent']
    SoIcon: typeof import('@soda-f2e/ui')['_IconComponent']
    SoListItem: typeof import('@soda-f2e/ui')['_ListItemComponent']
    SoList: typeof import('@soda-f2e/ui')['_ListComponent']
    SoVarComponent: typeof import('@soda-f2e/ui')['_VarComponentComponent']
  }
}
