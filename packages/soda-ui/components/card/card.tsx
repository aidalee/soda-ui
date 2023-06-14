import { defineComponent } from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './card.scss'
const ns = useNamespace('card')
export default defineComponent({
  name: 'SoCard',
  setup(props, ctx) {
    const { slots } = ctx
    console.log(111, slots.default && slots.default())
    return () => {
      return (
        <div class={[ns.b()]}>{ctx.slots.default && ctx.slots.default()}</div>
      )
    }
  }
})
