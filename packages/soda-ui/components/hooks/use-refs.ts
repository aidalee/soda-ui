import { ref, Ref, onBeforeUpdate } from 'vue'

export function useRefs<T = Element>() {
  const refs = ref([]) as Ref<T[]>
  const cache: Array<(el: unknown) => void> = []

  onBeforeUpdate(() => {
    refs.value = []
  })

  // setRefs执行后返回的是一个函数
  const setRefs = (index: number) => {
    //如果cache[index]不存在，为cache[index]赋值
    if (!cache[index]) {
      cache[index] = (el: unknown) => {
        refs.value[index] = el as T
      }
    }
    // cache 中包含的是一个个的函数
    return cache[index]
  }

  return [refs, setRefs] as const
}
