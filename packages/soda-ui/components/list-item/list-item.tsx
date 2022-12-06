import { defineComponent, toRefs, getCurrentInstance, computed, type CSSProperties } from 'vue'
import type { SetupContext } from 'vue'
import { ListItemProps, props } from './props'
import useListItem from './use-list-item'
import './list-item.scss'
import { getParentProp, cleanStyle } from '../utils/elements'

export default defineComponent({
  name: 'SoListItem',
  props: props,
  setup(props: ListItemProps, ctx: SetupContext) {
    const { title, value, inlineDesc, isLink, link, customClass } = toRefs(props)

    const { classes } = useListItem(props, ctx)
    
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
    return () => {
      return (
        <div class={[classes.value, customClass.value]}>
          <div class="so-list-item__left">
            {
              (title.value!=='' || ctx.slots.title) ? <label style={labelStyle.value} class="so-list-item__title">
                {title.value || ctx.slots.title?.()}
              </label> : null
            }
            {
              (inlineDesc.value!=='' || ctx.slots.inlineDesc?.()) ?
              <div class="so-list-item__inline-desc">
                {inlineDesc.value || ctx.slots.inlineDesc?.()}
              </div> : null
            }
          </div>
          <div>
            {
              (value.value!=='' || ctx.slots.default?.()) ? (
                <div class="so-list-item__right">
                  {value.value || ctx.slots.default?.()}
                </div>
              ) : null
            }
          </div>
        </div>
      )
    }
  }
})
