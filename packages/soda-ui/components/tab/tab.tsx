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
import './tab.scss'
import { tabProps } from './props'
import { ComponentInstance, type Numeric } from '../utils/basic'
import { useRefs } from '../hooks/use-refs'

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

    const getTabName = (tab: ComponentInstance, index: number): Numeric => {
      return tab.name ?? index
    }

    const setLine = () => {
      nextTick(() => {
        const titles = titleRefs.value
        if (titles && titles[state.currentIndex]) {
          const title = titles[state.currentIndex].$el
          const left = title.offsetLeft + title.offsetWidth / 2
          const lineStyle: CSSProperties = {
            width: '40px',
            height: '3px',
            // backgroundColor: '',
            transform: `translateX(${left}px) translateX(-50%)`
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
      // setLine()
      const { title } = item
      emit('click-tab', {
        index,
        title,
        event
      })
      // scrollToCurrentContent()
      // 处理完以上之后触发外面传进来的click-tab事件并传递相关的一些参数以供使用者使用
    }

    const setCurrentIndex = (index: number) => {
      state.currentIndex = index
    }

    // const scrollToCurrentContent = () => {}

    const renderNav = () => {
      return children.map((item: ComponentInstance, index: number) => {
        return (
          <TabTitle
            isActive={state.currentIndex == index}
            title={item.title}
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
        <div class={classes}>
          {renderNav()}
          {renderLine()}
        </div>
      )
    }

    const init = () => {
      console.log('init')
    }

    onMounted(() => {
      setLine()
    })

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

    return () => {
      return (
        <div class={[ns.b()]}>
          {renderHeader()}
          <div>{slots.default && slots.default()}</div>
          {/* <div class="so-tab__line">
            <div class="so-tab__line__inner"></div>
          </div> */}
        </div>
      )
    }
  }
})
