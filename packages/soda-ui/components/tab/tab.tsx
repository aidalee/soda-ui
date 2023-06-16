import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  InjectionKey,
  ComputedRef,
  ExtractPropTypes,
  reactive
} from 'vue'
import { useNamespace } from '../hooks/use-namespace'
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
  id: string
  props: TabProps
  // setLine: () => void
  // onRendered: (name: Numeric, title?: string) => void
  // scrollIntoView: (immediate?: boolean) => void
  // currentName: ComputedRef<Numeric | undefined>
}
import { useChildren } from '../hooks/use-relation'
export const TAB_KEY: InjectionKey<TabsProvide> = Symbol('so-tab')
const ns = useNamespace('tab')
export default defineComponent({
  name: 'SoTab',
  props: tabProps,
  setup(props, ctx) {
    const { children, linkChildren } = useChildren(TAB_KEY)
    const state = reactive({
      currentIndex: -1
    })
    return () => {
      return (
        <div class={[ns.b()]}>
          {ctx.slots.default && ctx.slots.default()}
          <div class="so-tab__line">
            <div class="so-tab__line__inner"></div>
          </div>
        </div>
      )
    }
  }
})
