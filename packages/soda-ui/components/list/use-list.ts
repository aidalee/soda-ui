import { computed } from 'vue'
import type { SetupContext } from 'vue'
import { ListProps, UseListReturnType } from './list-types'
import { useNamespace } from '../hooks/use-namespace'
import { isString } from 'lodash'

export default function useList(
  props: ListProps,
  ctx: SetupContext
): UseListReturnType {
  const ns = useNamespace('list')

  // const hasContent = computed(() => ctx.slots.default)

  const classes = computed(() => ({
    [ns.b()]: true
  }))

  return { classes }
}
