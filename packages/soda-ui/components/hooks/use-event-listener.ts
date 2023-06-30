import { Ref, watch, isRef, unref, onUnmounted, onDeactivated } from 'vue'
import { onMountedOrActivated } from './on-mounted-or-activated'
// import { inBrowser } from '../utils'
export const inBrowser = typeof window !== 'undefined'

type TargetRef = EventTarget | Ref<EventTarget | undefined>

export type UseEventListenerOptions = {
  target?: TargetRef
  capture?: boolean
  passive?: boolean
}

export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {}
) {
  if (!inBrowser) {
    return
  }
  console.log(222)
  const { target = window, passive = false, capture = false } = options

  let attached: boolean

  const add = (target?: TargetRef) => {
    const element = unref(target)

    if (element && !attached) {
      element.addEventListener(type, listener, { capture, passive })
      attached = true
    }
  }

  const remove = (target?: TargetRef) => {
    const element = unref(target)

    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }

  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))
  onMountedOrActivated(() => add(target))

  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  }
}
