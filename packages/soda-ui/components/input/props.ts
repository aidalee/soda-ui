// 一个input组件该具备的属性有哪些？
// 首先type属性：参考vant 和 varlet 组件库 除了input元素原生具备的属性外，vant加入了自定义的digit纯数字输入类型
import { numericProp, unknownProp, makeStringProp } from '../utils/props'
import { PropType } from 'vue'
export type InputTextAlign = 'left' | 'center' | 'right'

export type InputValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit'
export type InputRuleMessage =
  | string
  | ((value: any, rule: InputRule) => string)
export type InputRuleValidator = (
  value: any,
  rule: InputRule
) => boolean | string | Promise<boolean | string>
export type InputRuleFormatter = (value: any, rule: InputRule) => string

export type InputRule = {
  pattern?: RegExp
  trigger?: InputValidateTrigger
  message?: InputRuleMessage
  required?: boolean
  validator?: InputRuleValidator
  formatter?: InputRuleFormatter
}

export const props = {
  type: {
    type: String,
    default: 'text'
  },
  leftIcon: String,
  rightIcon: String,
  clearable: Boolean,
  clearIcon: makeStringProp,
  maxlength: Number,
  minlength: Number,
  autofocus: Boolean,
  inputAlign: String as PropType<InputTextAlign>,
  placeholder: String,
  autocomplete: String,
  errorMessage: String,
  error: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  },
  rules: Array as PropType<InputRule[]>,
  labelWidth: numericProp,
  labelAlign: String as PropType<InputTextAlign>,
  labelClass: unknownProp,
  showWordLimit: Boolean,
  errorMessageAlign: String as PropType<InputTextAlign>,
  colon: {
    type: Boolean,
    default: null
  }
}
