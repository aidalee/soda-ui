import type { PropType } from 'vue'
import type { ExtractPropTypes, ComputedRef } from 'vue'

function typeValidator(type: string): boolean {
  return ['primary', 'success', 'warning', 'error', 'default', 'text'].includes(
    type
  )
}

function sizeValidator(size: string): boolean {
  return ['large', 'middle', 'small'].includes(size)
}

function shapeValidator(shape: string): boolean {
  return ['round', 'circle'].includes(shape)
}

export const props = {
  type: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'error' | 'default' | 'text'
    >,
    default: 'default',
    validator: typeValidator
  },
  size: {
    type: String as PropType<'large' | 'middle' | 'small'>,
    default: 'middle',
    validator: sizeValidator
  },
  shape: {
    type: String as PropType<'round' | 'circle'>,
    default: 'round',
    validator: shapeValidator
  },
  color: {
    type: String
  },
  icon: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  gradients: {
    type: Array
  },
  delay: {
    type: Number
  },
  // onClick: {
  //   type: Function as PropType<(e: Event) => void | Promise<any>>
  // },
  onTouchstart: {
    type: Function as PropType<(e: Event) => void | Promise<any>>
  }
}

export type ButtonProps = ExtractPropTypes<typeof props>

export interface UseButtonReturnType {
  classes: ComputedRef<{
    [key: string]: string | boolean
  }>
  iconClass: ComputedRef<string>
}
