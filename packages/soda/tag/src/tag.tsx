import { defineComponent } from 'vue'
import type { SetupContext } from 'vue'

export default defineComponent({
  name: 'Tag',
  setup(props: any, ctx: SetupContext) {
    return () => {
      return (
        <div class="so-tag">
          <span>tag test</span>
        </div>
      )
    }
  }
})
