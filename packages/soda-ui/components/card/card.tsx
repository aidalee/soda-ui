import { defineComponent } from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './card.scss'
import { cardProps } from './props'
const ns = useNamespace('card')
export default defineComponent({
  name: 'SoCard',
  props: cardProps,
  setup(props, ctx) {
    const renderHeader = () => {
      const { title } = props
      const classes = {
        [ns.e('title')]: title
      }
      const cardExtra = ctx.slots?.extra && ctx.slots?.extra()
      if (title || cardExtra) {
        return (
          <div class="so-card__header">
            <div class={classes}>{title}</div>
            {cardExtra ? <div class="so-card__extra">{cardExtra}</div> : null}
          </div>
        )
      }
    }
    const cardStyle = () => {
      let cardStyle = props.style || {}
      if (props.radius) {
        if (typeof props.radius === 'number') {
          cardStyle = Object.assign(cardStyle, {
            borderRadius: `${props.radius}px`
          })
        } else {
          cardStyle = Object.assign(cardStyle, {
            borderRadius: `${props.radius}`
          })
        }
      }
      return cardStyle
    }
    const renderFooter = () => {
      const { slots } = ctx
      const classes = { [ns.e('footer')]: slots.footer }
      if (slots.footer) {
        return <div class={classes}>{slots.footer()}</div>
      }
    }
    return () => {
      return (
        <div class={[ns.b()]} style={cardStyle()}>
          {(props.title || ctx.slots?.extra) && renderHeader()}
          {/* {ctx.slots.default ? (
            <div class="so-card__body">{ctx.slots.default()}</div>
          ) : null} */}
          <div class="so-card__body">
            {ctx.slots?.default && ctx.slots.default()}
          </div>
          {ctx.slots.footer && renderFooter()}
        </div>
      )
    }
  }
})
