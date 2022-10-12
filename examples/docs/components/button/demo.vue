<template>
  <demo-block title="按钮类型">
    <so-button type="primary"> primary </so-button>
    <so-button type="success"> success </so-button>
    <so-button type="warning"> warning </so-button>
    <so-button type="error"> error </so-button>
    <so-button type="default"> default </so-button>
  </demo-block>
  <demo-block title="按钮形状">
    <so-button type="primary"> round </so-button>
    <so-button type="primary" shape="circle"> circle </so-button>
  </demo-block>
  <demo-block title="按钮大小">
    <so-button type="primary" size="lg"> large </so-button>
    <so-button type="success"> middle </so-button>
    <so-button size="sm" shape="circle"> small </so-button>
  </demo-block>
  <demo-block title="禁用状态">
    <so-button type="primary" disabled> disabled </so-button>
  </demo-block>
  <demo-block title="plain朴素按钮">
    <so-button type="primary" plain> disabled </so-button>
    <so-button type="primary" plain disabled> disabled </so-button>
  </demo-block>
  <demo-block title="color属性设置背景色，支持渐变">
    <so-button color="linear-gradient(to right, #ff6034, #ee0a24)">
      渐变色
    </so-button>
  </demo-block>
  <demo-block title="点击之后延迟禁点">
    <so-button type="primary" :delay="5000" @click="handleClick">
      dianji
    </so-button>
  </demo-block>
</template>

<script lang="ts">
export default {
  setup() {
    const handleClick = (params: any) => {
      console.log(111)
      console.log(params)
    }
    return { handleClick }
  }
}
</script>
<style lang="scss" scoped>
.so-button + .so-button {
  margin-top: 15px;
}
.so-button--sm + .so-button--sm {
  margin-left: 15px;
}
</style>
