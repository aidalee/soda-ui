import { defineComponent, toRefs } from 'vue'
import type { SetupContext } from 'vue'
import { ListProps, listProps } from './list-types'
import useList from './use-list'
import './list.scss'

export default defineComponent({
  name: 'SoList',
  props: listProps,
  setup(props: ListProps, ctx: SetupContext) {
    const { title } = toRefs(props)
    const { slots } = ctx
    const { classes } = useList(props, ctx)

    return () => {
      return (
        <div class={classes.value}>
          <div class="so-list__title" v-show="title">
            {title.value || slots.title?.()}
          </div>
          {slots.default?.()}
        </div>
      )
    }
  }
})
