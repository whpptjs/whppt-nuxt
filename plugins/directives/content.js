import Vue from 'vue';

export default ({ store }, whppt) => {
  Vue.directive('content', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        whppt.clearContents();
        whppt.clearEditData();

        const whpptNuxt = store.state[`whppt-nuxt/editor`];

        if (whpptNuxt.selector === 'select') {
          e.preventDefault();
          whppt.selectedContents = binding.value;
          whppt.selectedContentsElement = el;
          el.classList.add('whppt-component__select--active');
          whppt.clearEditingElementFormatting();
        }

        if (whpptNuxt.selector === 'content') {
          whppt.editData = undefined;
          store.commit('whppt-nuxt/editor/editInSidebar', { type: 'eContent', data: binding.value });
          whppt.editData = binding.value;
          whppt.editingElement = el;
          el.classList.add('whppt-component__content--active');
        }
      });
      el.addEventListener('mouseover', function(e) {
        const whpptNuxt = store.state[`whppt-nuxt/editor`];
        if (whpptNuxt.selector !== 'content') return;
        el.classList.add('whppt-component__select--hover');
      });
      el.addEventListener('mouseout', function(e) {
        el.classList.remove('whppt-component__select--hover');
      });
    },
  });
};
