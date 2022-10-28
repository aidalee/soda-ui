import { computed } from 'vue'
import type { SetupContext } from 'vue'
import { ButtonProps, UseButtonReturnType } from './button-types'
import { useNamespace } from '../../../hooks/use-namespace'
import { isString } from 'lodash'

export default function useButton(
  props: ButtonProps,
  ctx: SetupContext
): UseButtonReturnType {
  const ns = useNamespace('button')

  const hasContent = computed(() => ctx.slots.default)

  const buttonSize = computed(() => {
    return props.size
  })
  const classes = computed(() => ({
    [ns.b()]: true,
    [ns.m(props.type)]: true,
    [ns.m('disabled')]: props.disabled,
    [ns.m('plain')]: props.plain,
    [ns.m(buttonSize.value)]: true,
    [ns.e('icon-wrap')]: props.icon,
    [ns.e('icon')]: props.icon && !hasContent.value,
    [ns.m(props.shape || '')]:
      props.shape && isString(props.shape) ? true : false
  }))

  const iconClass = computed(() => {
    if (!props.icon) {
      return ''
    }
    const origin = `${ns.e('icon-fix')} icon`
    if (hasContent.value) {
      return `${origin} clear-right-5`
    } else {
      return origin
    }
  })

  return { classes, iconClass }
}
