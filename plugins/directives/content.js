import Vue from 'vue';

export default ({ store }, whppt) => {
  Vue.directive('content', {
    bind(el, binding) {
      let originalStyle = 'border: none';
      el.addEventListener('click', function(e) {
        whppt.editData = undefined;

        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'content') return;
        store.commit('whppt-nuxt/editor/editInSidebar', { type: 'eContent', data: binding.value });
        whppt.editData = binding.value;
      });
      el.addEventListener('mouseover', function(e) {
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'content') return;
        originalStyle = 'border: none';
        el.style = 'border: 1px solid blue';
      });
      el.addEventListener('mouseout', function(e) {
        el.style = originalStyle;
      });
    },
  });
};
