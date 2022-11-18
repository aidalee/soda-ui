<template>
  <demo-block>
    <so-list title="测试数据列表" title-color="#f00">
      <so-list-item title="list1" value="查看">
        <template #inlineDesc>
          <span>descdescdescdescdescdescdescdescdescdesc</span>
        </template>
      </so-list-item>
      <so-list-item title="list2" value="跳转" inline-desc="desc1 desc2">
      </so-list-item>
      <so-list-item title="list2" value="跳转" inline-desc="desc1 desc2">
      </so-list-item>
      <so-list-item title="list2" value="跳转" inline-desc="desc1 desc2">
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
