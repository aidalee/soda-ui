import { ExtractPropTypes, PropType, ComputedRef } from 'vue'
import { makeArrayProp, makeStringProp } from '../utils/props'

export const uploadProps = {
  max: {
    type: Number,
    default: 12
  },
  width: {
    type: Number,
    default: 105
  },
  height: {
    type: Number,
    default: 79
  },
  deleteable: {
    type: Boolean,
    default: true
  },
  onlyCamera: {
    type: Boolean,
    default: false
  },
  capture: {
    type: [String, Boolean] as PropType<boolean | 'user' | 'environment'>,
    default: undefined
  },
  modelValue: makeArrayProp<UploadFileListItem>(),
  resultType: makeStringProp<UploadResultType>('dataUrl')
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadFileListItem = {
  url?: string
  file?: File
  content?: string
  status?: '' | 'uploading' | 'done' | 'failed'
  message?: string
}

export type UploadResultType = 'dataUrl' | 'text' | 'file'
