import { ExtractPropTypes, PropType } from 'vue'
import { makeNumericProp } from '../utils/props'
export const swipeProps = {
  showIndicator: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 0
  },
  height: Number
}

export type SwipeProps = ExtractPropTypes<typeof swipeProps>
