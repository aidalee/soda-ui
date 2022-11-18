import type { PropType } from 'vue'

export const numericProp = [Number, String]

export const unknownProp = null as unknown as PropType<unknown>

export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})
