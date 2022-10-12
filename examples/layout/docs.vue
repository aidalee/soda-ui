<template>
  <div class="doc-page__container">
    <!-- 左侧栏 -->
    <div class="doc-page__menu">
      <router-link to="/components/button">
        button
      </router-link>
    </div>
    <!-- 中间文档 -->
    <div class="doc-page__content">
      <router-view />
    </div>
    <!-- 右侧手机模拟器加iframe -->
    <div class="doc-page__example">
      <!-- <iframe :src="demoUrl" frameborder="0"></iframe> -->
      <!-- <router-view></router-view> -->
      <Demo />
    </div>
  </div>
</template>

<script>
import Demo from './demo.vue'
export default {
  components: {
    Demo
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
.doc-page__container {
  display: flex;
  .doc-page__menu {
    width: 200px;
    box-shadow: 2px 0px 8px #f0f1f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
  }
  .doc-page__content {
    width: calc(100% - 575px);
    padding: 0 25px;
  }
  .doc-page__example {
    position: absolute;
    top: 88px;
    right: 24px;
    z-index: 1;
    // box-sizing: border-box;
    min-width: 375px;
    // min-width: 360px;
    // overflow: hidden;
    // background: #fafafa;
    // border-radius: 20px;
    // box-shadow: 0 8px 12px #ebedf0;
  }
}
</style>
