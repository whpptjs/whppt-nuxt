import Vue from 'vue';

export default ({ store }, whppt) => {
  Vue.directive('richText', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        whppt.clearEditData();

        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'edit') return;
        store.commit('whppt-nuxt/editor/editInSidebar', { type: 'richText', data: binding.value });
        whppt.editData = binding.value;
        whppt.editingElement = el;
        el.classList.add('whppt-component__content--active');
      });
      el.addEventListener('mouseover', function(e) {
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'edit') return;
        el.classList.add('whppt-component__select--hover');
      });
      el.addEventListener('mouseout', function(e) {
        el.classList.remove('whppt-component__select--hover');
      });
    },
  });
};
