# Card

### 介绍

用于展示一些信息

## 代码演示

### 基础卡片

```html
  <so-card>
    <p>我是基础卡片</p>
    <p>我是基础卡片</p>
    <p>我是基础卡片</p>
    <p>我是基础卡片</p>
  </so-card>
```
### 带header的卡片

```html
  <so-card title="header">
    <p>我是header卡片</p>
    <p>我是header卡片</p>
  </so-card>
```

### 圆角卡片
```html
  <so-card :radius="15">
    <p>我是圆角卡片</p>
  </so-card>
```

### 带操作的卡片

```html
<so-card title="带操作的卡片">
  <template #extra>
    <a href="www.baidu.com">查询</a>
  </template>
  <p>右上角带操作的卡片</p>
</so-card>
```

### 有footer的卡片

```html
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
```
## API

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 卡片标题 | _string_ | - | - |
| radius | 卡片圆角(百分比的字符串或具体数值px) | _string \| number_ | - | - |

### slots

| 名称 | 说明 |
| -- | -- |
| default | 卡片的主体内容 |
| extra | 卡片头部操作按钮部分 |
| footer | 卡片的底部 |