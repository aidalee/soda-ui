<template>
  <div class="sticky-demo-content">
    <demo-block title="sticky">
      <so-sticky :offset-top="50" position="top">
        <so-button type="primary">吸顶按钮</so-button>
      </so-sticky>
    </demo-block>
  </div>
</template>

<script lang="ts"></script>
<style lang="scss" scoped>
.sticky-demo-content {
  height: 2000px;
}
</style>
