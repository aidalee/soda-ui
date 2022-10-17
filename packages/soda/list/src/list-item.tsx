import { defineComponent, toRefs } from 'vue'
import type { SetupContext } from 'vue'
import { ListItemProps, listItemProps } from './list-item-types'

export default defineComponent({
  name: 'SoListItem',
  props: listItemProps,
  setup(props: ListItemProps, ctx: SetupContext) {
    const { title, value, inlineDesc, isLink, link } = toRefs(props)

    return () => {
      return (
        <div class="so-list-item">
          <div>
            <div class="so-list-item--title" v-show="title || ctx.slots.title">
              {title.value || ctx.slots.title?.()}
            </div>
            <div class="so-list-item--inline-desc"></div>
          </div>
          <div>
            <div
              class="so-list-item--right"
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
