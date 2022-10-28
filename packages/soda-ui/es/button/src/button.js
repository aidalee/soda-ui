import { createVNode as _createVNode } from "vue";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, toRefs } from 'vue';
import { buttonProps } from './button-types';
import useButton from './use-button';

import { throttle } from 'throttle-debounce';
// import { Icon } from '../../icon';

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Button',
  props: buttonProps,
  emits: ['click'],
  setup: function setup(props, ctx) {
    var _toRefs = toRefs(props),
      disabled = _toRefs.disabled,
      loading = _toRefs.loading,
      delay = _toRefs.delay,
      style = _toRefs.style,
      color = _toRefs.color;
    var _useButton = useButton(props, ctx),
      classes = _useButton.classes,
      iconClass = _useButton.iconClass;
    var _throttle;
    if (delay.value) {
      _throttle = throttle(delay.value, function () {
        ctx.emit('click', '触发点击延迟');
      });
    }
    var styleObj = style.value || {};
    if (color != null && color.value) {
      styleObj = Object.assign(style, {
        background: color.value,
        color: '#fff',
        borderWidth: 0
      });
    }
    var handleClick = function handleClick(e) {
      if (loading.value) {
        return;
      }
      if (_throttle) {
        _throttle();
      } else {
        ctx.emit('click', '触发点击');
      }
    };
    return function () {
      return _createVNode("button", {
        "style": styleObj,
        "class": classes.value,
        "disabled": disabled.value,
        "onClick": handleClick
      }, [_createVNode("span", {
        "class": "button-content"
      }, [ctx.slots["default"] == null ? void 0 : ctx.slots["default"]()])]);
    };
  }
});