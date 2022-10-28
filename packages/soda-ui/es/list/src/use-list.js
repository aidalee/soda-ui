import { computed } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace';
export default function useList(props, ctx) {
  var ns = useNamespace('list');

  // const hasContent = computed(() => ctx.slots.default)

  var classes = computed(function () {
    var _ref;
    return _ref = {}, _ref[ns.b()] = true, _ref;
  });
  return {
    classes: classes
  };
}