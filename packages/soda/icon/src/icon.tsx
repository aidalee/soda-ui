import { defineComponent, toRefs } from 'vue'
import { IconProps, iconProps } from './icon-type'

export default defineComponent({
  name: 'SoIcon',
  props: iconProps,
  setup(props: IconProps) {
    return () => {
      return <div class="so-icon"></div>
    }
  }
})
