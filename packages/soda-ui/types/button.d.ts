import {
  VarComponent,
  BasicAttributes,
  Type as ButtonType,
  Size as ButtonSize,
  shape as ButtonShape
} from './varComponent'
import { VNode } from 'vue'
export { ButtonType, ButtonSize, ButtonShape }

export interface ButtonProps extends BasicAttributes {
  type?: ButtonType
  size?: ButtonSize
  shape?: ButtonShape
  color?: string
  icon?: string
  loading?: boolean
  disabled?: string
  plain?: boolean
  gradients?: Array
  delay?: number
  // onClick?: (e: Event) => void
  onTouchstart?: (e: Event) => void
}

export class Button extends VarComponent {
  $props: ButtonProps
  $slots: {
    default(): VNode[]
  }
}

export class _ButtonComponent extends Button {}
