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
  nextTick
} from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import { onMountedOrActivated } from '../hooks/on-mounted-or-activated'
import './tab.scss'
import { tabProps } from './props'

// interface TabProps {
//   vertical?: boolean
//   defaultColor?: string
//   activeColor?: string
//   disabledColor?: string
// }

export type TabProps = ExtractPropTypes<typeof tabProps>

export type TabsProvide = {
  // id: string
  props: TabProps
  // setLine: () => void
  // onRendered: (name: Numeric, title?: string) => void
  // scrollIntoView: (immediate?: boolean) => void
  // currentName: ComputedRef<Numeric | undefined>
}
import { useChildren } from '../hooks/use-relation'
import TabTitle from './tab-title'
export const TAB_KEY: InjectionKey<TabsProvide> = Symbol('so-tab')
const ns = useNamespace('tab')
export default defineComponent({
  name: 'SoTab',
  props: tabProps,
  setup(props, ctx) {
    const { children, linkChildren } = useChildren(TAB_KEY)

    const state = reactive({
      currentIndex: -1,
      len: children.length
    })

    const renderNav = () => {
      return children.map((item, index) => {
        return <TabTitle title={item.title} />
      })
    }

    const renderHeader = () => {
      return <>{renderNav()}</>
    }

    const init = () => {}

    onMounted(() => {
      console.log(children, children.length)
    })

    watch(
      () => children.length,
      () => {
        nextTick(() => {})
      }
    )

    linkChildren({ props })

    onMountedOrActivated(init)

    return () => {
      return (
        <div class={[ns.b()]}>
          {renderHeader()}
          {ctx.slots.default && ctx.slots.default()}
          {/* <div class="so-tab__line">
            <div class="so-tab__line__inner"></div>
          </div> */}
        </div>
      )
    }
  }
})
