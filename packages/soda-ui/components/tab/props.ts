import { makeNumberProp } from '../utils/props'

export const tabProps = {
  scrollspy: Boolean,
  vertical: Boolean,
  active: makeNumberProp(0),
  swipeThreshold: makeNumberProp(5)
}
