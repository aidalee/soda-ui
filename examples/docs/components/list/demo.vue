<template>
  <demo-block>
    <so-list
      label-width="100px"
      label-align="left"
      title="测试数据列表"
      title-color="#f00"
    >
      <so-list-item title="测试" value="查看" left-icon="add">
        <template #desc>
          <span>descdescdescdescdescdescdescdescdescdesc</span>
        </template>
      </so-list-item>
      <so-list-item
        :title-style="{ marginLeft: '10px' }"
        title="测试"
        value="跳转"
        desc="desc1 desc2"
      >
        <template #leftIcon>
          <so-icon
            name="https://hz-soterea-web-src.oss-cn-hangzhou.aliyuncs.com/anxingchefu/image/backend-web/1-9.png"
            size="12"
          />
        </template>
      </so-list-item>
      <so-list-item title="测试" value="跳转" desc="desc1 desc2">
      </so-list-item>
      <so-list-item title="测试" value="跳转" desc="desc1 desc2">
      </so-list-item>
      <so-list-item title="测试" right-icon="add" desc="desc1 desc2">
      </so-list-item>
      <so-list-item title="测试" desc="desc1 desc2">
        <template #rightIcon>
          <so-icon
            name="https://hz-soterea-web-src.oss-cn-hangzhou.aliyuncs.com/anxingchefu/image/backend-web/1-9.png"
            size="12"
          />
        </template>
      </so-list-item>
    </so-list>
  </demo-block>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.so-doc-demo-block {
  padding: 12px 0;
}
</style>
