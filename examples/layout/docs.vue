<template>
  <div class="doc-page__container">
    <!-- 左侧栏 -->
    <div class="doc-page__menu">
      <router-link to="/components/button"> button </router-link>
      <router-link to="/components/list"> list列表 </router-link>
      <router-link to="/components/icon"> icon图标 </router-link>
      <router-link to="/components/field"> field输入 </router-link>
      <router-link to="/components/card"> card卡片 </router-link>
    </div>
    <!-- 中间文档 -->
    <div class="doc-page__content">
      <router-view />
    </div>
    <!-- 右侧手机模拟器加iframe -->
    <div :class="['doc-page__example', { 'doc-page__example-fixed': isFixed }]">
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
  data() {
    return {
      scrollTop: window.scrollY
    }
  },
  computed: {
    isFixed() {
      return this.scrollTop > 60
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY
    })
  }
}
</script>
<style lang="scss" scoped>
.doc-page__container {
  display: flex;
  .doc-page__menu {
    width: 200px;
    height: 100vh;
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
    top: 72px;
    right: 24px;
    z-index: 1;
    min-width: 375px;
  }
  .doc-page__example-fixed {
    position: fixed;
    top: 12px;
  }
  .doc-page__menu {
    display: flex;
    padding: 0 15px;
    a {
      color: #333;
      font-size: 16px;
      display: inline-block;
      width: 100%;
      text-align: left;
      padding: 8px 0;
    }
  }
}
</style>
