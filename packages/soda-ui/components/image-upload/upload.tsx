import { computed, defineComponent, reactive, ref } from 'vue'
import { useNamespace } from '../hooks/use-namespace'
import './upload.scss'
import {
  uploadProps,
  type UploadProps,
  type UploadFileListItem,
  type UploadResultType
} from './props'
import { toArray } from './util'

const ns = useNamespace('image-upload')

export default defineComponent({
  name: 'SoImageUpload',
  props: uploadProps,
  emits: ['update:modelValue'],
  setup(props: UploadProps, { emit, slots }) {
    const input = ref<HTMLElement>()

    const state = reactive({
      imgList: []
    })

    const basicStyle = computed(() => {
      const { width, height } = props
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    })

    const onChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement

      if (!files || !files.length) {
        return
      }

      const file =
        files.length === 1 ? files[0] : ([].slice.call(files) as File[]) // 将具有length属性的arguments转换为数组
      // 读取文件
      readFile(file)
    }

    const readFile = (files: File | File[]) => {
      const { max, modelValue, resultType } = props

      if (Array.isArray(files)) {
        // 如果选择多张上传
        const remainCount = +max - modelValue.length
        // 只保留可继续上传的数量
        if (files.length > remainCount) {
          files = files.slice(0, remainCount)
        }
        Promise.all(
          files.map((file: File) => readFileContent(file, resultType))
        ).then((contents: (string | void)[]) => {
          const fileList = (files as File[]).map(
            (file: File, index: number) => {
              const result: UploadFileListItem = {
                file,
                status: '',
                message: ''
              }
              if (contents[index]) {
                result.content = contents[index] as string
              }
              return result
            }
          )
          // 调用读取之后的函数渲染展示并更新绑定的数据列表
          readAfter(fileList)
        })
      } else {
        // 如果单张上传
        readFileContent(files, resultType).then(content => {
          const result: UploadFileListItem = {
            file: files as File,
            status: '',
            message: ''
          }
          if (content) {
            result.content = content
          }
          // 调用读取之后的函数渲染展示并更新绑定的数据列表
          readAfter(result)
        })
      }
    }

    const readAfter = (items: UploadFileListItem | UploadFileListItem[]) => {
      // 视图渲染
      // 数据更新
      emit('update:modelValue', [...props.modelValue, ...toArray(items)])
    }

    const readFileContent = (file: File, resultType: UploadResultType) => {
      return new Promise<string | void>((resolve, reject) => {
        if (resultType === 'file') {
          resolve()
          return
        }

        const reader = new FileReader()
        // FileReader 一种异步读取文件机制
        // readAsArrayBuffer(file)：按字节读取文件内容，结果用ArrayBuffer对象表示
        // readAsBinaryString(file)：按字节读取文件内容，结果为文件的二进制串
        // readAsDataURL(file)：读取文件内容，结果用data:url的字符串形式表示
        // readAsText(file,encoding)：按字符读取文件内容，结果用字符串形式表示
        // abort()：终止文件读取操作

        if (resultType === 'dataUrl') {
          reader.readAsDataURL(file)
        } else if (resultType === 'text') {
          reader.readAsText(file)
        }

        reader.onload = event => {
          resolve((event.target as FileReader).result as string)
        }

        // FileReader事件：
        // onloadstart：读取文件开始时触发
        // onprogress：读取过程中触发，会返还本次读取文件的最大字节数和已经读取完毕的字节数，可以用来做进度条
        // onabort：在读取中断时触发
        // onerror：在读取文件失败时触发
        // onload：在读取完成时触发
        // onloadend：读取结束后触发，不论成功还是失败都会触发，触发时机在onload之后
      })
    }
    return () => {
      return (
        <div class={ns.b()}>
          {props.modelValue.map((item, index) => {
            return (
              <div
                class={ns.e('added-img')}
                style={basicStyle.value}
                key={index}
              >
                <img src={item.content || item.url} />
              </div>
            )
          })}

          {props?.max > props.modelValue.length && (
            <div class={ns.e('add-img')} style={basicStyle.value}>
              <div class={ns.e('input')}>
                {props.onlyCamera && (
                  <input
                    type="file"
                    ref={input}
                    onChange={onChange}
                    accept="image/*"
                    capture={props.capture}
                  />
                )}
                <input
                  type="file"
                  ref={input}
                  onChange={onChange}
                  accept="image/*"
                  multiple
                />
                <so-icon name="add"></so-icon>
              </div>
            </div>
          )}
        </div>
      )
    }
  }
})
