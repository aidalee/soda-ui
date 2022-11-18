# Icon 图标

### 介绍

用于展示图标

### 基本用法

```html
<so-icon name="add" size="12"></so-icon>
```

### 点击事件

```html
<so-icon
  :name="name"
  size="32"
  color="#f00"
  :transition="300"
  @click="toggle"
></so-icon>
```
```ts
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
```

### 自定义图标

```html
<template>
  <so-icon
    class-prefix="test-icon"
    name="wechat"
    size="24"
    color="#f00"
  ></so-icon>
</template>
```
```css
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
```

### 图片图标

```html
<so-icon
  name="https://hz-soterea-web-src.oss-cn-hangzhou.aliyuncs.com/anxingchefu/image/backend-web/1-9.png"
  size="48"
></so-icon>
```

## API

### icon props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 图标名称或图片链接 | _string_ | - | - |
| size | 图标大小 | _string \| number_ | - | - |
| color | 图标颜色 | _string \| number_ | - | - |
| transition | 过渡动画时间 | _string \| number_ | - | - |
| class-prefix | 类名前缀（用于使用除组件库提供的之外的自定义图标）| _string_ | - | - |

### icon event
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击图标时触发 | _event: MouseEvent_ |