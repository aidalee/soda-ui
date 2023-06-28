import { makeNumberProp } from '../utils/props'

export const tabProps = {
  vertical: Boolean,
  defaultColor: String,
  activeColor: String,
  disabledColor: String,
  swipeThreshold: makeNumberProp(5)
}
