export var listItemProps = {
  // 标题
  title: {
    type: String,
    "default": ''
  },
  // 右侧文字，复杂的样式布局请使用 slot (default slot)
  value: {
    type: String,
    "default": ''
  },
  // 标题下面文字，一般为说明文字
  inlineDesc: {
    type: String,
    "default": ''
  },
  // 是否为链接，如果是，右侧将会出现指引点击的右箭头
  isLink: {
    type: Boolean,
    "default": false
  },
  // 点击链接，可以为 http(s) 协议，也可以是 vue-router 支持的地址形式
  link: {
    type: [String, Object]
  }
};