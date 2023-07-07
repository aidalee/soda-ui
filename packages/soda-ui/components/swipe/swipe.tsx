import {
  CSSProperties,
  ComputedRef,
  InjectionKey,
  computed,
  defineComponent,
  onActivated,
  onMounted,
  reactive,
  ref
} from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import { swipeProps, type SwipeProps } from './props'
import './swipe.scss'
import { useChildren } from '../hooks/use-relation'
const ns = useNamespace('swipe')
export const SWIPE_KEY: InjectionKey<SwipeProvide> = Symbol('so-swipe')
export type SwipeProvide = {
  props: SwipeProps
  size: ComputedRef<number>
  count: number
  activeIndicator: ComputedRef<number>
}
export default defineComponent({
  name: 'SoSwipe',
  props: swipeProps,
  emits: [],
  setup(props: SwipeProps, { emit, slots }) {
    const { children, linkChildren } = useChildren(SWIPE_KEY)

    console.log(children, 'children')

    const state = reactive({
      active: 0,
      offset: 0,
      count: 0
    })

    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator()
      }
      if (props.showIndicator) {
        return <div class={ns.e('indicator')}></div>
      }
    }

    const size = computed(() => {
      return props.width
    })

    // const count = computed(() => children.length)

    const activeIndicator = computed(() => state.active)

    const style = computed(() => {
      return {
        width: `${props.width}px`,
        height: `${props.height}px`
      }
    })

    const containerStyle = computed(() => {
      console.log(state.count, 'state.count', props.width)
      const width = props.width * state.count

      // return {
      //   width: props.width * state.count,
      //   transform: `translateX(${0}px)`
      // }
      const style: CSSProperties = {
        transform: 'translateX(0px)'
      }
      console.log(props.width * state.count, 'b')
      const le = props.width * state.count
      style['width'] = `${le}px`
      console.log(style)
      return style
    })

    linkChildren({
      size,
      count: state.count,
      props,
      activeIndicator
    })

    onMounted(() => {
      state.count = 3
    })

    onActivated(() => {
      state.count = children.length
    })

    return () => (
      <div class={ns.b()} style={style.value}>
        <div class={ns.e('container')} style={containerStyle.value}>
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    )
  }
})
