import { defineComponent } from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './swipe-item.scss'
import { useParent } from '../hooks/use-relation'
import { SWIPE_KEY } from '../swipe/swipe'
const ns = useNamespace('swipe-item')

export default defineComponent({
  name: 'SoSwipeItem',
  setup(props, { emit, slots }) {
    const { size } = useParent(SWIPE_KEY)
    return () => {
      return <div class={ns.b()}>{slots.default?.()}</div>
    }
  }
})
