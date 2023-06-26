/* eslint-disable vue/require-default-prop */
import { computed, defineComponent, type CSSProperties } from 'vue'
import { isDef } from '../utils/validate'
import { useNamespace } from '../hooks/use-namespace'
// import { useParent } from '../hooks/use-relation'
const ns = useNamespace('tab')
import { TAB_KEY } from './tab'
export default defineComponent({
  name: 'SoTabTitle',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: String,
    isActive: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    activeColor: String,
    inactiveColor: String
    // onClick:
    // disabled: Boolean
  },
  setup(props, ctx) {
    // const { parent } = useParent(TAB_KEY)
    const { slots } = ctx
    const style = computed(() => {
      const { isActive, activeColor, inactiveColor } = props
      const style: CSSProperties = {}
      const titleColor = isActive ? activeColor : inactiveColor
      if (titleColor) {
        style.color = titleColor
      }
      return style
    })
    const renderText = () => {
      const Text = <div>{slots.title ? slots.title() : props.title}</div>
      return Text
    }
    return () => (
      <div
        // aria-disabled={props.disabled || undefined}
        aria-aria-selected={props.isActive}
        style={style.value}
        class={ns.e('title')}
      >
        {renderText()}
      </div>
    )
  }
})
