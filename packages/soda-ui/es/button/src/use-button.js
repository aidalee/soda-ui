import { computed } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace';
import { isString } from 'lodash';
export default function useButton(props, ctx) {
  var ns = useNamespace('button');
  var hasContent = computed(function () {
    return ctx.slots["default"];
  });
  var buttonSize = computed(function () {
    return props.size;
  });
  var classes = computed(function () {
    var _ref;
    return _ref = {}, _ref[ns.b()] = true, _ref[ns.m(props.type)] = true, _ref[ns.m('disabled')] = props.disabled, _ref[ns.m('plain')] = props.plain, _ref[ns.m(buttonSize.value)] = true, _ref[ns.e('icon-wrap')] = props.icon, _ref[ns.e('icon')] = props.icon && !hasContent.value, _ref[ns.m(props.shape || '')] = props.shape && isString(props.shape) ? true : false, _ref;
  });
  var iconClass = computed(function () {
    if (!props.icon) {
      return '';
    }
    var origin = ns.e('icon-fix') + " icon";
    if (hasContent.value) {
      return origin + " clear-right-5";
    } else {
      return origin;
    }
  });
  return {
    classes: classes,
    iconClass: iconClass
  };
}