// 在使用keep-alive时:
// 初次进入时：OnMounted 和 onActivated
// 退出时：deactivated
// 再次进入时只会触发：onActivated

import { onActivated, onMounted, nextTick } from 'vue'

// 只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中
export function onMountedOrActivated(hook: () => any) {
  let mounted: boolean
  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
