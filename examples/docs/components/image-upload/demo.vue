<template>
  <demo-block title="基础上传">
    <so-image-upload v-model="state.imgList"></so-image-upload>
  </demo-block>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      imgList: []
    })
    return { state }
  }
}
</script>
<style lang="scss" scoped></style>
