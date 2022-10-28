import { withDirectives as _withDirectives, createVNode as _createVNode, vShow as _vShow } from "vue";
import { defineComponent, toRefs } from 'vue';
import { listItemProps } from './list-item-types';
export default defineComponent({
  name: 'ListItem',
  props: listItemProps,
  setup: function setup(props, ctx) {
    var _toRefs = toRefs(props),
      title = _toRefs.title,
      value = _toRefs.value,
      inlineDesc = _toRefs.inlineDesc,
      isLink = _toRefs.isLink,
      link = _toRefs.link;
    return function () {
      return _createVNode("div", {
        "class": "so-list-item"
      }, [_createVNode("div", {
        "class": "so-list-item__left"
      }, [_withDirectives(_createVNode("div", {
        "class": "so-list-item__title"
      }, [title.value || (ctx.slots.title == null ? void 0 : ctx.slots.title())]), [[_vShow, "title || ctx.slots.title"]]), _withDirectives(_createVNode("div", {
        "class": "so-list-item__inline-desc"
      }, [inlineDesc.value || (ctx.slots.inlineDesc == null ? void 0 : ctx.slots.inlineDesc())]), [[_vShow, "inlineDesc || ctx.slots.inlineDesc?.()"]])]), _createVNode("div", null, [_withDirectives(_createVNode("div", {
        "class": "so-list-item__right"
      }, [value.value || (ctx.slots["default"] == null ? void 0 : ctx.slots["default"]())]), [[_vShow, "value || ctx.slots.default"]])])]);
    };
  }
});