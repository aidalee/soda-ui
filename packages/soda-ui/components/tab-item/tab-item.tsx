import { defineComponent, onMounted, getCurrentInstance, ref } from 'vue'
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
  setup(props, ctx) {
    // const currentIndex = 0
    // const onItemClick = (e: MouseEvent) => {
    //   ctx.emit('on-item-click', currentIndex)
    // }
    const { parent, index } = useParent(TAB_KEY)
    console.log(22, parent, index)
    return () => {
      return (
        <div class={[ns.b()]}>
          <div class="so-tab-item__content">
            {ctx.slots.default && ctx.slots.default()}
          </div>
          {/* {props?.badgeLabel && (
            <div class="so-tab-item__badge">{props.badgeLabel}</div>
          )} */}
        </div>
      )
    }
  }
})
