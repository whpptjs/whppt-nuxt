import Vue from 'vue';
import { without } from 'lodash';

export default ({ store }, whppt) => {
  Vue.directive('move', {
    bind(el, binding) {
      let originalStyle = 'border: none';
      el.addEventListener('click', function(e) {
        whppt.editData = undefined;
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'moveUp' && whpptNuxt.selector !== 'moveDown') return;

        const _item = binding.value.item;
        // let _array = binding.value.array;

        const i = binding.value.parent.contents.indexOf(_item);
        const _array = without(binding.value.parent.contents, _item);

        if (whpptNuxt.selector === 'moveUp') {
          if (i === 0) return;
          _array.splice(i - 1, 0, _item);
          return;
        }
        _array.splice(i + 1, 0, _item);
      });
      el.addEventListener('mouseover', function(e) {
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'moveUp' && whpptNuxt.selector !== 'moveDown') return;
        originalStyle = 'border: none';
        el.style = 'border: 1px solid blue';
      });
      el.addEventListener('mouseout', function(e) {
        el.style = originalStyle;
      });
    },
  });
};
