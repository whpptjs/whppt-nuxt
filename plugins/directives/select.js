import Vue from 'vue';

export default ({ store }, whppt) => {
  Vue.directive('select', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        whppt.clearEditData();
        whppt.clearSelected();

        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'select') return;
        whppt.select(el, binding.value);
        whppt.formatSelectedElement();
      });
      el.addEventListener('mouseover', function(e) {
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'select') return;
        el.classList.add('whppt-component__select--hover');
      });
      el.addEventListener('mouseout', function(e) {
        el.classList.remove('whppt-component__select--hover');
      });
    },
  });
};
