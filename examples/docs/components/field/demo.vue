<template>
  <demo-block>
    <so-list label-width="100px" label-align="left">
      <so-field label="验证码" type="text" placeholder="请输入验证码">
        <template #right>
          <so-button type="primary">发送验证码</so-button>
        </template>
      </so-field>
      <so-field label="姓名" type="text" placeholder="请输入姓名"></so-field>
      <so-field
        label="手机号"
        type="text"
        left-icon="add"
        placeholder="请输入手机号"
      ></so-field>
      <so-field
        label="地址"
        type="text"
        disabled
        placeholder="请输入地址"
      ></so-field>
      <so-field
        label="详细地址"
        type="radio"
        placeholder="请输入详细地址"
      ></so-field>
      <so-field
        label="联系方式"
        type="tel"
        placeholder="请输入联系方式"
        right-icon="add"
      ></so-field>
    </so-list>
  </demo-block>
</template>
<style lang="scss" scoped>
.so-doc-demo-block {
  padding: 12px 0;
}
</style>
