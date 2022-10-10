<template>
  <div class="so-doc-demo-block">
    <h2 v-if="title" class="so-doc-demo-block__title">
      {{ title }}
    </h2>
    <div v-if="card" class="so-doc-demo-block__card">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
<script>
export default {
  name: 'DemoBlock',
  props: {
    title: {
      type: String,
      default: ''
    },
    card: Boolean
  }
}
</script>

<style lang="scss" scoped>
.so-doc-demo-block {
  padding: 12px 15px;
  &__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: blue;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  &__card {
    margin: 12px 12px 0;
    overflow: hidden;
    border-radius: 8px;
  }
  &:first-of-type {
    .so-doc-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
