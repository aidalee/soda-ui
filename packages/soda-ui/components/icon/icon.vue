<template>
  <component
    :is="isURL(name) ? 'img' : 'i'"
    :class="[...classes, shrinking ? [ns.m('shrinking')] : '']"
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
import { defineComponent, watch, ref, nextTick, computed, toRefs } from 'vue'
import type { Ref } from 'vue'
import { props } from './props'
import { isURL, toNumber } from '@soda-f2e/utils'
import { toSizeUnit } from '../utils/elements'
import { useNamespace } from '../hooks/use-namespace'
const ns = useNamespace('icon')

export default defineComponent({
  name: 'SoIcon',
  props,
  emits: ['click'],
  setup(props, ctx) {
    const nextName: Ref<string | undefined> = ref('')
    const shrinking: Ref<boolean> = ref(false)

    const handleNameChange = async (
      newName: string | undefined,
      oldName: string | undefined
    ) => {
      const { transition } = props
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
    const onClick = () => {
      ctx.emit('click')
    }

    const classes = computed(() => {
      if (!isURL(props.name)) {
        return [
          [ns.b()],
          [props.classPrefix],
          `${props.classPrefix}-${props.name}`
        ]
      } else {
        return [ns.b()]
      }
    })

    watch(() => props.name, handleNameChange, { immediate: true })

    return {
      ns,
      classes,
      nextName,
      shrinking,
      isURL,
      toNumber,
      toSizeUnit,
      onClick
    }
  }
})
</script>

<style lang="scss">
@import './icon.scss';
</style>
