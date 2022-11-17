import { VarComponent, BasicAttributes } from './varComponent'
import { VNode } from 'vue'

export interface ListItemProps extends BasicAttributes {
  title?: string
  value?: string
  inlineDesc?: string
  isLink?: boolean
  link?: Record<string, any>
}

export class ListItem extends VarComponent {
  $props: ListProps
  $slots: {
    title(): VNode[]
    'inline-desc'(): VNode[]
    default(): VNode[]
  }
}

export class _ListComponent extends ListItem {}
