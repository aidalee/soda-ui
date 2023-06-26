import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  ref,
  computed,
  reactive
} from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './tab-item.scss'
import { tabItemProps } from './props'
import { useParent } from '../hooks/use-relation'
import { TAB_KEY } from '../tab/tab'
const ns = useNamespace('tab-item')
export default defineComponent({
  name: 'SoTabItem',
  props: tabItemProps,
  // emits: ['on-item-click'],
  setup(props, { slots }) {
    const { parent, index } = useParent(TAB_KEY)

    const getName = () => props.name ?? index.value

    const active = computed(() => {
      // 取被激活选项的标签name和当下选项的标签name进行比对，命中项的内容展示出来
      const isActive = getName() === parent?.currentName?.value
      return isActive
    })

    return () => {
      const show = active.value
      return (
        <div class={ns.e('content')} v-show={show}>
          {slots.default && slots.default()}
        </div>
      )
    }
  }
})
