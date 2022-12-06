import { ExtractPropTypes, PropType, ComputedRef } from 'vue'
export type LabelAlign = 'left' | 'center' | 'right'

export const props = {
  title: {
    type: String,
    default: ''
  },
  titleColor: {
    type: String,
    default: ''
  },
  // 为子元素设定统一 label 宽度
  labelWidth: {
    type: String,
    default: ''
  },
  // 为子元素设定统一对齐方式
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: ''
  },
  labelMarginRight: {
    type: String,
    default: ''
  },
  style: {
    type: Object
  }
} as const

export type ListProps = ExtractPropTypes<typeof props>

export interface UseListReturnType {
  classes: ComputedRef<{
    [key: string]: string | boolean
  }>
}
