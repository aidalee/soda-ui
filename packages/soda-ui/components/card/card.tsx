import { defineComponent } from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './card.scss'
const ns = useNamespace('card')
export default defineComponent({
  name: 'SoCard',
  setup(props, ctx) {
    const { slots } = ctx
    return () => {
      return (
        <div
          class={[ns.b()]}
          v-slots={{ default: slots.default ? slots.default() : null }}
        ></div>
      )
    }
  }
})
