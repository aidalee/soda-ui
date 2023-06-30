<template>
  <div class="tab-deno-content">
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
    <demo-block title="触发标签栏点击事件">
      <so-tab @click-tab="handleClick">
        <so-tab-item title="标签1">content 1</so-tab-item>
        <so-tab-item title="标签2">content 2</so-tab-item>
      </so-tab>
    </demo-block>
    <demo-block title="垂直模式">
      <so-tab vertical :active="3">
        <so-tab-item title="标签1">content 1</so-tab-item>
        <so-tab-item title="标签2">content 2</so-tab-item>
        <so-tab-item title="标签3">content 3</so-tab-item>
        <so-tab-item title="标签4">content 4</so-tab-item>
      </so-tab>
    </demo-block>
    <demo-block title="标签内容自定义">
      <so-tab>
        <so-tab-item>
          <template #title>自定义的标签</template>
          content 1
        </so-tab-item>
        <so-tab-item title="标签2">
          <template #title>
            <so-icon size="12" name="add"></so-icon>
            <span>带图标的标签</span>
          </template>
          content 2
        </so-tab-item>
      </so-tab>
    </demo-block>
    <demo-block title="滚动导航">
      <so-tab scrollspy>
        <so-tab-item v-for="index in 8" :key="index" :title="'选项' + index">
          内容 {{ index }}
        </so-tab-item>
      </so-tab>
    </demo-block>
  </div>
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
<style lang="scss" scoped>
// .tab-deno-content {
//   overflow-y: auto;
// }
</style>
