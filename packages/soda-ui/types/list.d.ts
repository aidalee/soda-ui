import { VarComponent, BasicAttributes } from './varComponent'
import { VNode } from 'vue'

export interface ListProps extends BasicAttributes {
  title?: string
  titleColor?: string
  labelWidth?: string
  labelAlign?: string
  onClick?: (e: Event) => void
}

export class List extends VarComponent {
  $props: ListProps
  $slots: {
    default(): VNode[]
  }
}

export class _ListComponent extends List {}
