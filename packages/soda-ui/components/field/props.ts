import { makeStringProp } from '../../utils'

export type FieldType =
  | 'tel'
  | 'url'
  | 'date'
  | 'file'
  | 'text'
  | 'time'
  | 'week'
  | 'color'
  | 'digit'
  | 'email'
  | 'image'
  | 'month'
  | 'radio'
  | 'range'
  | 'reset'
  | 'button'
  | 'hidden'
  | 'number'
  | 'search'
  | 'submit'
  | 'checkbox'
  | 'password'
  | 'textarea'
  | 'datetime-local'

export const fieldProps = {
  label: String,
  type: makeStringProp<FieldType>('text'),
  name: String,
  modelValue: String,
  disabled: Boolean,
  readonly: Boolean,
  placeholder: String,
  leftIcon: String,
  iconPrefix: String,
  rightIcon: String
}
