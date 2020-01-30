import Vue from 'vue';

export default ({ store }, whppt) => {
  Vue.directive('link', {
    bind(el, binding) {
      let originalStyle = 'border: none';
      el.addEventListener('click', function(e) {
        whppt.editData = undefined;
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'edit') return;
        store.commit('whppt-nuxt/editor/editInSidebar', { type: 'linkSidebar', data: binding.value });
        whppt.editData = binding.value;
      });
      el.addEventListener('mouseover', function(e) {
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'edit') return;
        originalStyle = 'border: none';
        el.style = 'border: 1px solid blue';
      });
      el.addEventListener('mouseout', function(e) {
        el.style = originalStyle;
      });
    },
  });
};
