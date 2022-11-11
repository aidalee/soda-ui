/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, toRefs } from 'vue'
import type { SetupContext } from 'vue'
// import { ButtonProps, buttonProps } from './button-types'
import { props, ButtonProps } from './props'
import useButton from './use-button'
import './button.scss'
import { throttle } from 'throttle-debounce'

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'SoButton',
  props: props,
  emits: ['click'],
  setup(props: ButtonProps, ctx: SetupContext) {
    const { disabled, loading, delay, color } = toRefs(props)
    const { classes, iconClass } = useButton(props, ctx)

    let _throttle: () => void

    if (delay?.value) {
      _throttle = throttle(delay.value, () => {
        ctx.emit('click', '触发点击延迟')
      })
    }

    let styleObj = {}

    if (color?.value) {
      styleObj = {
        background: color.value,
        color: '#fff',
        borderWidth: 0
      }
    }
    type MyFunc = (e: MouseEvent) => void

    const onClick: MyFunc = (e: MouseEvent) => {
      if (loading.value) {
        return
      }
      ctx.emit('click', e)
    }

    return () => {
      return (
        <button
          style={styleObj}
          class={classes.value}
          disabled={disabled.value}
          onClick={onClick}
        >
          {/* {icon.value && <Icon name={icon.value} size="14" class={iconClass.value} />} */}
          <span class="button-content">{ctx.slots.default?.()}</span>
        </button>
      )
    }
  }
})
