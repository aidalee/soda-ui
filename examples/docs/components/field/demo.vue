<template>
  <demo-block>
    <so-list label-width="80px">
      <so-field label="姓名" type="text" placeholder="请输入姓名"></so-field>
      <so-field label="手机号" type="text" placeholder="请输入手机号"></so-field>
      <so-field label="地址" type="text" disabled placeholder="请输入地址"></so-field>
      <so-field label="详细地址" type="radio" placeholder="请输入详细地址"></so-field>
    </so-list>
  </demo-block>
</template>
<style lang="scss" scoped>
.so-doc-demo-block {
  padding: 12px 0;
}
</style>