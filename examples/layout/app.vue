<template>
  <div
    v-if="!isDemoPage"
    class="docs"
  >
    <div class="docs__header">
      <router-link to="/">
        So UI
      </router-link>
      <div class="header-nav">
        <router-link to="/">
          指南
        </router-link>
        <router-link to="/components/button">
          组件
        </router-link>
      </div>
    </div>
    <div class="docs__main">
      <router-view />
    </div>
    <div class="docs__footer">
      footer
    </div>
  </div>
  <router-view v-else />
</template>

<script>
export default {
  data() {
    return {
      isDemoPage: false
    }
  },
  mounted() {
    this.isDemoPage = /#\/demo/.test(location.href)
  }
}
</script>

<style lang="scss" scoped>
.docs {
  .docs__header {
    height: 60px;
    background: #fff;
    padding: 0 40px;
    box-shadow: 0 2px 8px #f0f1f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-nav {
      a {
        margin: 0 10px;
      }
    }
  }
  .docs__main {
    overflow: scroll;
  }
  .docs__footer {
    height: 100px;
    // position: fixed;
    // left: 0;
    // bottom: 0;
    // right: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
