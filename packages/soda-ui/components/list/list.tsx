import { defineComponent, toRefs } from 'vue'
import type { SetupContext } from 'vue'
import { ListProps, props } from './props'
import useList from './use-list'
import './list.scss'

export default defineComponent({
  name: 'SoList',
  props: props,
  setup(props: ListProps, ctx: SetupContext) {
    const { title, titleColor, style } = toRefs(props)
    const { slots } = ctx
    const { classes } = useList(props, ctx)

    let styleobj: Record<string, any>
    if (style?.value) {
      styleobj = Object.assign(style.value, {
        color: titleColor.value ? titleColor.value : ''
      })
    } else {
      styleobj = {
        color: titleColor.value ? titleColor.value : ''
      }
    }

    return () => {
      return (
        <div class={classes.value}>
          <div class="so-list__title" v-show="title" style={styleobj}>
            {title.value || slots.title?.()}
          </div>
          {slots.default?.()}
        </div>
      )
    }
  }
})
