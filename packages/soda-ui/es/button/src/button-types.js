// import { EmitType } from '../../types'

export var buttonProps = {
  size: {
    type: String,
    "default": 'md'
  },
  type: {
    type: String,
    "default": 'default'
  },
  color: {
    type: String,
    "default": ''
  },
  icon: {
    type: String,
    "default": ''
  },
  loading: {
    type: Boolean,
    "default": false
  },
  disabled: {
    type: Boolean,
    "default": false
  },
  shape: {
    type: String,
    "default": 'round'
  },
  plain: {
    type: Boolean,
    "default": false
  },
  gradients: {
    type: Array,
    validator: function validator(val) {
      return val.length === 2;
    }
  },
  delay: {
    type: Number,
    "default": 0
  },
  style: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    "default": function _default() {}
  }
  // just for jsx
  // onClick: {
  //   type: [Function, Array] as PropType<EmitType<(e: MouseEvent) => void>>
  //   // type: Function as PropType<(e: MouseEvent) => void>
  // }
};

export var buttonGroupProps = {
  flexRank: {
    type: String
  },
  right: {
    type: Boolean,
    "default": false
  }
};
export var buttonGroupInjectionKey = Symbol('so-button-group');