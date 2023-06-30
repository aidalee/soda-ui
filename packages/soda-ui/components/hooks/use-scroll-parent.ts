import { ref, Ref, onMounted } from 'vue'
export const inBrowser = typeof window !== 'undefined'

type ScrollElement = HTMLElement | Window

const overflowScrollReg = /scroll|auto/i
const defaultRoot = inBrowser ? window : undefined
// 是否是元素节点
function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1
  return (
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === ELEMENT_NODE_TYPE
  )
}
// 获取元素最近的可滚动父元素
export function getScrollParent(
  el: Element,
  root: ScrollElement | undefined = defaultRoot
) {
  let node = el

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentNode as Element
  }

  return root
}

export function useScrollParent(
  el: Ref<Element | undefined>,
  root: ScrollElement | undefined = defaultRoot
) {
  const scrollParent = ref<Element | Window>()

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root)
    }
  })

  return scrollParent
}
