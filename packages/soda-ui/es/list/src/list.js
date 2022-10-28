import { withDirectives as _withDirectives, createVNode as _createVNode, vShow as _vShow } from "vue";
import { defineComponent, toRefs } from 'vue';
import { listProps } from './list-types';
import useList from './use-list';

export default defineComponent({
  name: 'List',
  props: listProps,
  setup: function setup(props, ctx) {
    var _toRefs = toRefs(props),
      title = _toRefs.title;
    var slots = ctx.slots;
    var _useList = useList(props, ctx),
      classes = _useList.classes;
    return function () {
      return _createVNode("div", {
        "class": classes.value
      }, [_withDirectives(_createVNode("div", {
        "class": "so-list__title"
      }, [title.value || (slots.title == null ? void 0 : slots.title())]), [[_vShow, "title"]]), slots["default"] == null ? void 0 : slots["default"]()]);
    };
  }
});