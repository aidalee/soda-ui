# List 列表

### 介绍

用于展示数据列表

### 基本用法

```html
<so-list title="测试数据列表">
  <so-list-item title="list1" value="查看">
    <template #inlineDesc>
      <span>descdescdescdescdescdescdescdescdescdesc</span>
    </template>
  </so-list-item>
  <so-list-item title="list2" value="跳转" inline-desc="desc1 desc2">
  </so-list-item>
</so-list>
```

## API

### list props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 标题 | _String_ | - | - |

### list slots
| 名称 | 说明 |
| --- | --- |
| default | 标签内展示的内容 |
