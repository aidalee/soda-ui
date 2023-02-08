import { computed, defineComponent } from 'vue'
import ListItem from '../list-item/list-item'
import { fieldProps } from './props'
import { useNamespace } from '../hooks/use-namespace'
import { useParent } from '../hooks/use-parent'
import { isDef } from '../utils/validate'
import './field.scss'
const ns = useNamespace('field')
// Shared props of Field and Form
export type FieldFormSharedProps = 'disabled' | 'readonly'

export default defineComponent({
  name: 'SoField',
  components: {
    ListItem
  },
  props: fieldProps,
  setup(props, ctx) {
    const { slots } = ctx
    const form = useParent()
    const getProp = <T extends FieldFormSharedProps>(key: T) => {
      if (isDef(props[key])) {
        return props[key]
      }
      if (form && isDef(form.props[key])) {
        return form.props[key]
      }
    }

    const onFocus = (event: Event) => {
      // 修改鼠标状态等
    }

    const onBlur = (event: Event) => {
      // 如果是readonly直接return
      // 修改鼠标状态 操作表单值与样式等
    }

    const onInput = (event: Event) => {
      // 输入时修改表单值
    }

    const onClickInput = (event: MouseEvent) => {
      // 触发点击事件
    }

    const onKeypress = (event: KeyboardEvent) => {
      const ENTER_CODE = 13
      // emit触发keypress事件
    }

    const renderLeftIcon = () => {
      const leftIconSlot = slots['left-icon']
      const classes = ns.e('left-icon')

      if (props.leftIcon || leftIconSlot) {
        return (
          <div class={classes}>
            {leftIconSlot ? (
              leftIconSlot()
            ) : (
              <so-icon name={props.leftIcon} classPrefix={props.iconPrefix} />
            )}
          </div>
        )
      }
    }

    const renderLabel = () => {
      const classes = {
        [ns.e('label')]: props.label,
        [ns.em('label', 'disabled')]: props.disabled
      }
      if (props.label) {
        return <span class={classes}>{props.label}</span>
      }
    }

    const renderInput = () => {
      // 之后要考虑开放input slots 用于用户传入自定义的表单
      const classes = ns.e('input')

      const inputAttrs = {
        name: props.name,
        value: props.modelValue,
        disabled: props.disabled,
        readonly: props.readonly,
        placeholder: props.placeholder,
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onKeypress
      }

      return <input class={classes} type={props.type} {...inputAttrs} />
    }

    const renderRight = () => {
      const rightSlot = slots['right']
      const classes = {
        [ns.e('right-icon')]: props.rightIcon || rightSlot
      }
      if (props.rightIcon || rightSlot) {
        return (
          <div class={classes}>
            {rightSlot ? (
              rightSlot()
            ) : (
              <so-icon name={props.rightIcon} classPrefix={props.iconPrefix} />
            )}
          </div>
        )
      }
    }

    const onClear = () => {
      // 清除输入框的值
    }

    const showClear = computed(() => {
      return true
    })

    const renderFieldBody = () => {
      const classes = {
        [ns.e('field-body')]: true
      }
      return (
        <div class={classes}>
          {renderInput()}
          {showClear.value && (
            <so-icon
              name={props.clearIcon}
              class={ns.e('clear')}
              onTouchstart={onClear}
            ></so-icon>
          )}
          {renderRight()}
        </div>
      )
    }

    return () => {
      const leftIcon = renderLeftIcon()
      const defaultSlot = renderFieldBody()
      return (
        <list-item
          v-slots={{
            leftIcon: leftIcon ? () => leftIcon : null,
            default: defaultSlot ? () => defaultSlot : null
          }}
          title={renderLabel()}
          customClass={ns.b()}
        ></list-item>
      )
    }
  }
})
