import { defineComponent, onMounted, getCurrentInstance, ref } from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './tab-item.scss'
import { tabItemProps } from './props'
const ns = useNamespace('tab-item')
export default defineComponent({
  name: 'SoTabItem',
  props: tabItemProps,
  emits: ['on-item-click'],
  setup(props, ctx) {
    const currentIndex = 0
    const onItemClick = (e: MouseEvent) => {
      ctx.emit('on-item-click', currentIndex)
    }
    return () => {
      return (
        <div class={[ns.b()]} onClick={onItemClick}>
          <div class="so-tab-item__label">
            {ctx.slots.default && ctx.slots.default()}
          </div>
          {props?.badgeLabel && (
            <div class="so-tab-item__badge">{props.badgeLabel}</div>
          )}
        </div>
      )
    }
  }
})
