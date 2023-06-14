<template>
  <demo-block title="基础卡片">
    <so-card>
      <p>我是基础卡片</p>
      <p>我是基础卡片</p>
      <p>我是基础卡片</p>
      <p>我是基础卡片</p>
    </so-card>
  </demo-block>
  <demo-block title="带header的卡片">
    <so-card title="header">
      <p>我是header卡片</p>
      <p>我是header卡片</p>
    </so-card>
  </demo-block>
  <demo-block title="radius卡片">
    <so-card :radius="15">
      <p>我是圆角卡片</p>
    </so-card>
  </demo-block>
  <demo-block title="带操作的卡片">
    <so-card title="带操作的卡片">
      <template #extra>
        <a href="www.baidu.com">查询</a>
      </template>
      <p>右上角带操作的卡片</p>
    </so-card>
  </demo-block>
  <demo-block title="有footer的卡片">
    <so-card title="我有footer">
      <template #extra>
        <a href="www.baidu.com">查询</a>
      </template>
      <template #footer>
        <p>我是一个小footer噢</p>
      </template>
      <p>看下面</p>
      <p>⬇️</p>
    </so-card>
  </demo-block>
</template>

<script lang="ts"></script>
<style lang="scss" scoped></style>
