<template>
  <demo-block title="图标">
    <so-icon name="add" size="12"></so-icon>
    <so-icon name="clear" size="12"></so-icon>
    <so-icon
      :name="name"
      size="32"
      color="#f00"
      :transition="300"
      @click="toggle"
    ></so-icon>
    <so-icon
      class-prefix="test-icon"
      name="wechat"
      size="24"
      color="#f00"
    ></so-icon>
    <so-icon
      name="https://hz-soterea-web-src.oss-cn-hangzhou.aliyuncs.com/anxingchefu/image/backend-web/1-9.png"
      size="48"
    ></so-icon>
  </demo-block>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const name = ref('add')
    const toggle = () => {
      name.value = name.value === 'add' ? 'clear' : 'add'
    }
    return { toggle, name }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'test-icon';
  /* Project id 3779141 */
  src: url('//at.alicdn.com/t/c/font_3779141_my03p3cki4.woff2?t=1668756032788')
      format('woff2'),
    url('//at.alicdn.com/t/c/font_3779141_my03p3cki4.woff?t=1668756032788')
      format('woff'),
    url('//at.alicdn.com/t/c/font_3779141_my03p3cki4.ttf?t=1668756032788')
      format('truetype');
}
.test-icon {
  font-family: 'test-icon' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.test-icon-sure:before {
  content: '\e608';
}

.test-icon-wechat:before {
  content: '\e609';
}
</style>
