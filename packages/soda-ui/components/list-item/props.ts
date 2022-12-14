import { ExtractPropTypes, ComputedRef, PropType } from 'vue'

export const props = {
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 右侧文字，复杂的样式布局请使用 slot (default slot)
  value: {
    type: String,
    default: ''
  },
  // 标题下面文字，一般为说明文字
  desc: {
    type: String,
    default: ''
  },
  // 是否为链接，如果是，右侧将会出现指引点击的右箭头
  isLink: {
    type: Boolean,
    default: false
  },
  // 点击链接，可以为 http(s) 协议，也可以是 vue-router 支持的地址形式
  link: {
    type: [String, Object] as PropType<
      // eslint-disable-next-line @typescript-eslint/ban-types
      string | { path: string; params?: {}; query?: {} }
    >
  },
  customClass: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: ''
  },
  rightIcon: {
    type: String,
    default: ''
  },
  iconPrefix: {
    type: String,
    default: 'so-icon'
  },
  titleStyle: {
    type: Object,
    default: {}
  }
} as const

export type ListItemProps = ExtractPropTypes<typeof props>

export interface UseListItemReturnType {
  classes: ComputedRef<{
    [key: string]: string | boolean
  }>
}
