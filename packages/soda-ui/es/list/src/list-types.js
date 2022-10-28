export var listProps = {
  title: {
    type: String,
    "default": ''
  },
  titleColor: {
    type: String,
    "default": ''
  },
  // 为子元素设定统一 label 宽度
  labelWidth: {
    type: String,
    "default": ''
  },
  // 为子元素设定统一对齐方式
  labelAlign: {
    type: String,
    "default": ''
  },
  listStyle: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    "default": function _default() {}
  }
};