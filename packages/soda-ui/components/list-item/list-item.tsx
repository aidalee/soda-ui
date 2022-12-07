import { defineComponent, toRefs, getCurrentInstance, computed, type CSSProperties } from 'vue'
import type { SetupContext } from 'vue'
import { ListItemProps, props } from './props'
import useListItem from './use-list-item'
import './list-item.scss'
import { getParentProp, cleanStyle } from '../utils/elements'
import SoIcon from '../icon/icon.vue'
import { isDef } from '../utils/validate'
import { useNamespace } from '../hooks/use-namespace'
export default defineComponent({
  name: 'SoListItem',
  props: props,
  components: {
    SoIcon
  },
  setup(props: ListItemProps, ctx: SetupContext) {
    const { title, value, desc, isLink, link, customClass, leftIcon } = toRefs(props)

    const { slots } = ctx

    // const { classes } = useListItem(props, ctx)

    const ns = useNamespace('list-item')
    
    const labelStyle = computed(()=>{
      let style:CSSProperties = cleanStyle(
        {
          width: getParentProp(getCurrentInstance()?.parent,'labelWidth'),
          textAlign: getParentProp(getCurrentInstance()?.parent,'labelAlign'),
          marginRight: getParentProp(getCurrentInstance()?.parent,'labelMarginRight')
        }
      )
      return style
    })

    console.log(getCurrentInstance(), '0999999')
    console.log(getCurrentInstance()?.parent, '99888')

    console.log(isDef(props.title), 'isdef title')
    console.log(slots.title, 'slots.title')
    console.log(props.title, 'props.title')
  
    const renderDesc = () => {
      if (slots.desc || isDef(props.desc)) {
        return (
          <div class={[ns.e('desc')]}>
            {slots.desc ? slots.desc() : <span>{props.desc}</span>}
          </div>
        )
      }
    }

    const renderTitle = () => {
      if (slots.title || isDef(props.title) ) {
        return (
          <div class={[ns.e('left')]}>
            <div class={[ns.e('title')]}>
              {renderLeftIcon()}
              { slots.title ? slots.title() : <span style={{...labelStyle.value, ...props.titleStyle}}>{props.title}</span> }
            </div>
            {renderDesc()}
          </div>
        )
      }
    }

    const renderValue = () => {
      if(slots.default || isDef(props.value)) {
        return (
          <div class={[ns.e('right')]}>
            {slots.default ? slots.default() : <span>{props.value}</span>}
          </div>
        )
      }
    }

    const renderLeftIcon = () => {
      if(slots.leftIcon) {
        return slots.leftIcon()
      }
      if(props.leftIcon) {
        return (
          <so-icon
            name={props.leftIcon}
            class={ns.e('left-icon')}
            classPrefix={props.iconPrefix}
          />
        )
      }
    }
    const renderRightIcon = () => {
      if (slots.rightIcon) {
        return slots.rightIcon()
      }
      if (props.rightIcon) {
        return (
          <so-icon
            name={props.rightIcon}
            class={ns.e('right-icon')}
            classPrefix={props.iconPrefix}
          />
        )
      }
    }

    return () => {
      return (
        <div class={[ns.b(), customClass.value]}>
          {renderTitle()}
          {renderValue()}
          {renderRightIcon()}
        </div>
      )
    }
  }
})
