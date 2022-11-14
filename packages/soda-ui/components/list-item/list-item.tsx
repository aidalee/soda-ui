import { defineComponent, toRefs } from 'vue'
import type { SetupContext } from 'vue'
import { ListItemProps, props } from './props'
import useListItem from './use-list-item'
import './list-item.scss'

export default defineComponent({
  name: 'SoListItem',
  props: props,
  setup(props: ListItemProps, ctx: SetupContext) {
    const { title, value, inlineDesc, isLink, link } = toRefs(props)

    const { classes } = useListItem(props, ctx)

    return () => {
      return (
        <div class={classes.value}>
          <div class="so-list-item__left">
            <div class="so-list-item__title" v-show="title || ctx.slots.title">
              {title.value || ctx.slots.title?.()}
            </div>
            <div
              class="so-list-item__inline-desc"
              v-show="inlineDesc || ctx.slots.inlineDesc?.()"
            >
              {inlineDesc.value || ctx.slots.inlineDesc?.()}
            </div>
          </div>
          <div>
            <div
              class="so-list-item__right"
              v-show="value || ctx.slots.default"
            >
              {value.value || ctx.slots.default?.()}
            </div>
          </div>
        </div>
      )
    }
  }
})
