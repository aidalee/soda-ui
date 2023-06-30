import {
  ref,
  defineComponent,
  reactive,
  ExtractPropTypes,
  type PropType,
  computed,
  CSSProperties
} from 'vue'
import { useRect } from '../hooks/use-rect'
import { useEventListener } from '../hooks/use-event-listener'
import { useScrollParent } from '../hooks/use-scroll-parent'
import { useNamespace } from '../hooks/use-namespace'
import { makeNumericProp, makeStringProp, numericProp } from '../utils/props'
import { getScrollTop, isHidden } from '../utils/dom'
import './sticky.scss'
// Sticky 组件与 CSS 中 position: sticky 属性实现的效果一致，
// 当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。
const ns = useNamespace('sticky')
export type StickyPosition = 'top' | 'bottom'

const stickyProps = {
  zIndex: numericProp,
  position: makeStringProp<StickyPosition>('top'),
  container: Object as PropType<Element>,
  offsetTop: makeNumericProp(0),
  offsetBottom: makeNumericProp(0)
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>

export default defineComponent({
  name: 'SoSticky',
  props: stickyProps,
  emits: ['scroll', 'change'],
  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>()

    const scrollParent = useScrollParent(root)

    const state = reactive({
      fixed: false,
      width: 0,
      height: 0,
      transform: 0
    })

    // 定义吸顶时距离顶部或者底部的距离
    // eslint-disable-next-line vue/return-in-computed-property
    const offset = computed(() => {
      return props.position === 'top'
        ? Number(props.offsetTop)
        : Number(props.offsetBottom)
    })
    // eslint-disable-next-line vue/return-in-computed-property
    const rootStyle = computed<CSSProperties | undefined>(() => {
      const { fixed, height, width } = state
      if (fixed) {
        return {
          width: `${width}px`,
          height: `${height}px`
        }
      }
    })

    const onScroll = () => {
      if (!root.value || isHidden(root)) {
        return
      }
      // position指定是粘在底部还是顶部 top、bottom
      const { container, position } = props
      // 取当前元素自身的宽高、距离视窗的距离等
      const rootRect = useRect(root)
      // 获取当前视窗纵向滚动条滚动的高度
      const scrollTop = getScrollTop(window)
      state.width = rootRect.width
      state.height = rootRect.height

      if (position === 'top') {
        // 如果是吸顶
        // 如果指定了容器 粘性定位的元素需要保持在容器元素内
        // 如果没有指定容器直接设置
        // 如果当前元素到视窗顶部的距离小于用户设置的吸顶时距离顶部的距离，则开启粘性定位
        state.fixed = offset.value > rootRect.top
      } else {
        const { clientHeight } = document.documentElement // 取当前视窗的的高度
        // 如果是吸底
        // 如果指定了容器 粘性定位的元素需要保持在容器元素内
        // 如果没有指定容器直接设置
        // 当前视窗的高度减去用于设置的吸顶时距离底部的距离小于 当前粘性元素的底部到视窗顶部的距离， 开启粘性定位
        state.fixed = clientHeight - offset.value < rootRect.bottom
      }
    }

    useEventListener('scroll', onScroll, { target: scrollParent })

    const stickyStyle = computed<CSSProperties | undefined>(() => {
      if (!state.fixed) {
        return
      }
      const style: CSSProperties = {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props.position]: `${offset.value}px`
      }

      return style
    })

    return () => (
      <div ref={root} style={rootStyle.value}>
        <div class={ns.m('fixed')} style={stickyStyle.value}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
