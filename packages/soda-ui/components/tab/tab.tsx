import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  InjectionKey,
  ComputedRef,
  ExtractPropTypes,
  reactive,
  watch,
  nextTick,
  CSSProperties,
  computed
} from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import { onMountedOrActivated } from '../hooks/on-mounted-or-activated'
import { useEventListener } from '../hooks/use-event-listener'
import { useScrollParent } from '../hooks/use-scroll-parent'
import { useRect } from '../hooks/use-rect'
import { useExpose } from '../hooks/use-expose'

import './tab.scss'
import { tabProps } from './props'
import { ComponentInstance, type Numeric } from '../utils/basic'
import { useRefs } from '../hooks/use-refs'
import { getElementTop, scrollTopTo } from '../utils/dom'

export type TabProps = ExtractPropTypes<typeof tabProps>

export type TabsProvide = {
  // id: string
  props: TabProps
  // setLine: () => void
  // onRendered: (name: Numeric, title?: string) => void
  // scrollIntoView: (immediate?: boolean) => void
  currentName: ComputedRef<Numeric | undefined>
}

import { useChildren } from '../hooks/use-relation'
import TabTitle from './tab-title'
export const TAB_KEY: InjectionKey<TabsProvide> = Symbol('so-tab')
const ns = useNamespace('tab')

export default defineComponent({
  name: 'SoTab',
  props: tabProps,
  emits: ['click-tab'],
  setup(props, { emit, slots }) {
    // tab组件根元素实例
    const root = ref<HTMLElement>()
    // 获取tab元素最近的可滚动父元素
    const scroller = useScrollParent(root)

    const wrapRef = ref<HTMLElement>()
    let lockScroll: boolean

    let tabHeight: number

    const { children, linkChildren } = useChildren(TAB_KEY)
    const [titleRefs, setTitleRefs] = useRefs<ComponentInstance>()

    const state = reactive({
      currentIndex: 0,
      lineStyle: {} as CSSProperties
    })
    // eslint-disable-next-line vue/return-in-computed-property
    const currentName = computed(() => {
      const activeTab = children[state.currentIndex]
      if (activeTab) {
        return getTabName(activeTab, state.currentIndex)
      }
    })

    const scrollable = computed(() => children.length > props.swipeThreshold)

    const scrollOffset = computed(() => {
      // if (props.sticky) {
      //   return offsetTopPx.value + tabHeight
      // }
      // return 0
      return tabHeight
    })

    const getTabName = (tab: ComponentInstance, index: number): Numeric => {
      return tab.name ?? index
    }

    const setLine = () => {
      nextTick(() => {
        const titles = titleRefs.value
        if (titles && titles[state.currentIndex]) {
          const title = titles[state.currentIndex].$el
          const left = title.offsetLeft + title.offsetWidth / 2
          const top = title.offsetTop

          let lineStyle: CSSProperties = {}
          if (props.vertical) {
            lineStyle = {
              width: '3px',
              height: '26px',
              transform: `translateY(${top}px)`
            }
          } else {
            lineStyle = {
              width: '40px',
              height: '3px',
              transform: `translateX(${left}px) translateX(-50%)`
            }
          }

          state.lineStyle = lineStyle
        }
      })
    }

    const onClickTabItem = (
      item: ComponentInstance,
      index: number,
      event: MouseEvent
    ) => {
      // 点击tabItem 处理标签的样式
      setCurrentIndex(index)
      const { title } = item
      // 处理完以上之后触发外面传进来的click-tab事件并传递相关的一些参数以供使用者使用
      emit('click-tab', {
        index,
        title,
        event
      })
    }

    const setCurrentIndex = (index: number) => {
      state.currentIndex = index
    }

    const renderNav = () => {
      return children.map((item: ComponentInstance, index: number) => {
        return (
          <TabTitle
            isActive={state.currentIndex == index}
            title={item.title}
            v-slots={{ title: item.$slots.title }}
            scrollable={scrollable.value}
            disabled={item.disabled}
            ref={setTitleRefs(index)}
            onClick={(event: MouseEvent) => onClickTabItem(item, index, event)}
          />
        )
      })
    }
    const renderLine = () => {
      const classes = ns.e('line')
      return <div class={classes} style={state.lineStyle}></div>
    }

    const renderHeader = () => {
      const classes = {
        [ns.e('header')]: true,
        [ns.em('header', 'complete')]: scrollable.value
      }

      return (
        <div ref={wrapRef} class={classes}>
          {renderNav()}
          {renderLine()}
        </div>
      )
    }

    const init = () => {
      if (props.active) {
        state.currentIndex = props.active
      }
      nextTick(() => {
        if (wrapRef.value) {
          // 取tab标签自身的高度
          tabHeight = useRect(wrapRef.value).height
          console.log(tabHeight, 'tabheight')
        }
        console.log('scroller', scroller)
      })
      setLine()
    }

    const scrollToCurrentContent = (immediate = false) => {
      if (props.scrollspy) {
        const target = children[state.currentIndex].$el

        if (target && scroller.value) {
          const to = getElementTop(target, scroller.value) - scrollOffset.value

          lockScroll = true
          scrollTopTo(
            scroller.value,
            to,
            immediate ? 0 : +0.3,
            // immediate ? 0 : +props.duration,
            () => {
              lockScroll = false
            }
          )
        }
      }
    }
    // 鼠标滚动条滚动的距离 大于当前元素距离窗口的高度 index为当前元素index
    const getCurrentIndexOnScroll = () => {
      for (let index = 0; index < children.length; index++) {
        // debugger
        console.log(index, 'index')
        // 获取当前元素距离浏览器窗口顶部的位置
        const { top } = useRect(children[index].$el) // 获取元素的大小及其相对于视口的位置

        // if (top > scrollOffset.value) {
        //   // console.log(top, 'top', index, children.length)
        //   return index === 0 ? 0 : index - 1
        // }
      }
      return children.length - 1
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scrollTo = (name: Numeric) => {
      console.log('scroll-to')
      nextTick(() => {
        // setCurrentIndexByName(name)
        scrollToCurrentContent(true)
      })
    }
    const onScroll = () => {
      // console.log('3')

      if (props.scrollspy) {
        console.log('scroll', scroller)
        const index = getCurrentIndexOnScroll()
        setCurrentIndex(index)
      }
    }

    watch(
      () => props.active,
      () => {
        setCurrentIndex(props.active)
      }
    )

    watch(
      () => children.length,
      () => {
        nextTick(() => {
          setLine()
        })
      }
    )

    watch(
      () => state.currentIndex,
      () => {
        setLine()
      }
    )

    linkChildren({ props, currentName })

    onMountedOrActivated(init)
    // 监听目标元素的滚动事件
    useEventListener('scroll', onScroll, { target: scroller })
    useExpose({
      resize: setLine,
      scrollTo
    })

    return () => {
      return (
        <div
          ref={root}
          class={[ns.b(), props.vertical ? ns.m('vertical') : '']}
        >
          {renderHeader()}
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})
