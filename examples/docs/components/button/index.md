# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

## 代码演示

### 按钮类型

支持 `primary` 、`success` 、`warning`、`error`、`default`五种类型，默认为`default`。

```html
<so-button type="primary">primary</so-button>
<so-button type="success">success</so-button>
<so-button type="warning">warning</so-button>
<so-button type="error">error</so-button>
<so-button type="default">default</so-button>
```

### 按钮形状

支持 `round`、`circle`两种类型，默认为`round`。

```html
<so-button type="primary">round</so-button>
<so-button type="primary" shape="circle">circle</so-button>
```

### 按钮大小

有 `lg`、`md`、`sm`三种类型，默认为`md`。

```html
<so-button type="primary" size="lg">large</so-button>
<so-button type="success">middle</so-button>
<so-button size="sm" shape="circle">small</so-button>
```

### 禁用状态

通过`disable`设置禁用状态

```html
<so-button large color="primary" disabled>disabled</so-button>
```

### plain 朴素按钮

```html
<so-button type="primary" plain>disabled</so-button>
<so-button type="primary" plain disabled>disabled</so-button>
```

### color 属性自定义按钮颜色

```html
<so-button color="linear-gradient(to right, #ff6034, #ee0a24)"
  >渐变色</so-button
>
```

## API

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | _string_ | `primary` `success` `warning` `danger` `default` | `default` |
| size | 尺寸 | _string_ | `lg` `md` `sm` | `md` |
| color | 自定义按钮颜色，支持 `linear-gradient` 渐变色 | _string_ | - | - |
| delay | 延迟点击时间，单位 ms | _number_ | - | - |
