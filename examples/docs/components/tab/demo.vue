<template>
  <demo-block title="基础tab选项卡">
    <so-tab>
      <so-tab-item title="标签1">内容1</so-tab-item>
      <so-tab-item disabled title="标签2">内容2</so-tab-item>
      <so-tab-item title="标签3">内容3</so-tab-item>
      <so-tab-item title="标签4">内容4</so-tab-item>
      <so-tab-item title="标签5">内容5</so-tab-item>
      <so-tab-item title="标签6">内容6</so-tab-item>
      <so-tab-item title="标签7">内容7</so-tab-item>
      <so-tab-item title="标签8">内容8</so-tab-item>
      <so-tab-item title="标签9">内容9</so-tab-item>
      <so-tab-item title="标签10">内容10</so-tab-item>
    </so-tab>
  </demo-block>
  <demo-block>
    <so-tab @click-tab="handleClick">
      <so-tab-item title="标签1">content 1</so-tab-item>
      <so-tab-item title="标签2">content 2</so-tab-item>
    </so-tab>
  </demo-block>
</template>

<script lang="ts">
export default {
  setup() {
    const handleClick = (params: { index: number; title: string }) => {
      const { index, title } = params
      console.log(`点击了${title}，索引为${index}`)
    }
    return { handleClick }
  }
}
</script>
<style lang="scss" scoped></style>
