import type {
  ComputedRef,
  ExtractPropTypes,
  PropType,
  InjectionKey,
  Ref
} from 'vue'

export type IButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'default'
export type IButtonSize = 'lg' | 'md' | 'sm'
export type IButtonShape = 'round' | 'circle'
export type IButtonGroupFlexRank = 'two' | 'three'

export const buttonProps = {
  size: {
    type: String as PropType<IButtonSize>,
    default: 'md'
  },
  type: {
    type: String as PropType<IButtonType>,
    default: 'default'
  },
  color: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  shape: {
    type: String as PropType<IButtonShape>,
    default: 'round'
  },
  plain: {
    type: Boolean,
    default: false
  },
  gradients: {
    type: Array,
    validator: (val: string[]) => {
      return val.length === 2
    }
  },
  delay: {
    type: Number,
    default: 0
  },
  style: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
} as const

export const buttonGroupProps = {
  flexRank: {
    type: String as PropType<IButtonGroupFlexRank>
  },
  right: {
    type: Boolean,
    default: false
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export interface UseButtonReturnType {
  classes: ComputedRef<{
    [key: string]: string | boolean
  }>
  iconClass: ComputedRef<string>
}

interface ButtonGroupInjection {
  flexRank: Ref<IButtonGroupFlexRank>
  right: Ref<false>
}

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupInjection> =
  Symbol('so-button-group')
