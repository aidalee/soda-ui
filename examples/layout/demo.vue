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
      return `${location.origin}${location.pathname}#/demo/${component}`
      // return `${location.origin}/#/demo/button`;
    }
  }
}
</script>
<style lang="scss" scoped>
.so-doc-demo__mobi {
  position: relative;
  padding-top: 200%;
  background-image: url('../images/phone.png');
  background-position: top center;
  background-size: contain;
  background-repeat: no-repeat;
  box-sizing: border-box;
  overflow: hidden;
  .so-doc-demo__mobi__content {
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 7%;
    box-sizing: border-box;
  }
}
iframe {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0 0 9% 9%;
}
</style>
