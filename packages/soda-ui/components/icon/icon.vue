<template>
  <component
    :is="isURL(name) ? 'img' : 'i'"
    :class="classes"
    class="so-icon-add"
    :src="isURL(name) ? nextName : null"
    :style="{
      color,
      transition: `transform ${toNumber(transition)}ms`,
      width: isURL(name) ? toSizeUnit(size) : null,
      height: isURL(name) ? toSizeUnit(size) : null,
      fontSize: toSizeUnit(size)
    }"
    @click="onClick"
  />
</template>

<script lang="ts">
import { defineComponent, watch, ref, nextTick, computed } from 'vue'
import type { Ref } from 'vue'
import { props } from './props'
import { isURL, toNumber } from '@soda-f2e/utils'
import { toSizeUnit } from '../utils/elements'
import { useNamespace } from '../hooks/use-namespace'
const ns = useNamespace('icon')

export default defineComponent({
  name: 'SoIcon',
  props,
  setup(props) {
    const nextName: Ref<string | undefined> = ref('')
    const shrinking: Ref<boolean> = ref(false)

    const handleNameChange = async (
      newName: string | undefined,
      oldName: string | undefined
    ) => {
      const { transition, name } = props
      if (oldName == null || toNumber(transition) === 0) {
        nextName.value = newName
        return
      }

      shrinking.value = true
      await nextTick()
      setTimeout(() => {
        oldName != null && (nextName.value = newName)
        shrinking.value = false
      }, toNumber(transition))
    }

    const classes = computed(() => ({
      [ns.b()]: true
    }))

    watch(() => props.name, handleNameChange, { immediate: true })

    return {
      ns,
      classes,
      nextName,
      shrinking,
      isURL,
      toNumber,
      toSizeUnit
    }
  }
})
</script>

<style lang="scss">
@import './icon.scss';
</style>
