import { upperFirst } from './utils'

// 创建组件核心文件模板
export default function genCoreTemplate(name: string) {
  const compName = upperFirst(name)
  const propsTypeName = upperFirst(name) + 'Props'
  const propsName = name + 'Props'
  const propsFileName = name + '-type'
  const className = 'so-' + name
  return `\
import { defineComponent, toRefs } from 'vue'
import { ${propsTypeName}, ${propsName} } from './${propsFileName}'

export default defineComponent({
  name: 'So${compName}',
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    return () => {
      return <div class="${className}"></div>
    }
  }
})
`
}
