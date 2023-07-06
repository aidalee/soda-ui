<template>
  <demo-block title="基础上传">
    <so-image-upload
      v-model="state.imgList"
      @delete="handleDelete"
    ></so-image-upload>
  </demo-block>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      imgList: []
    })
    const handleDelete = (params: { item: any; index: any }) => {
      const { item, index } = params
      // alert('dele')
      state.imgList.splice(index, 1)
    }
    return { state, handleDelete }
  }
}
</script>
<style lang="scss" scoped>
.so-doc-demo-block {
  background: #fff;
  min-height: 100%;
}
</style>
