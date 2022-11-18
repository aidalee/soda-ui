import type { PropType } from 'vue'

export const props = {
  name: {
    type: String
  },
  size: {
    type: [Number, String]
  },
  color: {
    type: String
  },
  transition: {
    type: [Number, String],
    default: 0
  },
  classPrefix: {
    type: String,
    default: 'so-icon'
  },
  onClick: {
    type: Function as PropType<(event: Event) => void>
  }
}
