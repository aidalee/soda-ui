<!-- 取docs文件夹中的.vue文件 代码和渲染成的组件 -->
<template>
  <div class="so-doc-demo__mobi">
    <div class="so-doc-demo__mobi__content">
      <iframe :src="demoUrl" frameborder="0" />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    demoUrl() {
      const match = this.$route.path.match(/[components|packages]\/(.*)/)
      const component = match && match[1]
      console.log(component, location.origin, location.pathname)
      return `${location.origin}${location.pathname}#/demo/${component}`
      // return `${location.origin}/#/demo/button`
    }
  }
}
</script>
<style lang="scss" scoped>
.so-doc-demo__mobi {
  position: relative;
  padding-top: 200%;
  background-color: #f8f9fa;
  border-radius: 20px;
  box-shadow: 2px 0px 8px #f0f1f2;
  box-sizing: border-box;
  overflow: hidden;
  .so-doc-demo__mobi__content {
    width: 360px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
  }
}
iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
