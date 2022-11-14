import { computed } from 'vue'
import type { SetupContext } from 'vue'
import { ListItemProps, UseListItemReturnType } from './props'
import { useNamespace } from '../hooks/use-namespace'

export default function useList(
  props: ListItemProps,
  ctx: SetupContext
): UseListItemReturnType {
  const ns = useNamespace('list-item')

  // const hasContent = computed(() => ctx.slots.default)

  const classes = computed(() => ({
    [ns.b()]: true
  }))

  return { classes }
}
