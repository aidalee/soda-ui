import { createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SoTag',
  setup: function setup(props, ctx) {
    return function () {
      return _createVNode("div", {
        "class": "so-tag"
      }, [_createVNode("span", null, [_createTextVNode("tag test")])]);
    };
  }
});