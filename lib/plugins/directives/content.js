import Vue from 'vue';

export default ({ store, app: { $whppt } }, menuIsInState, MENUSTATES) => {
  Vue.directive('whppt-content', {
    bind(el, binding) {
      const whitelist = el.getAttribute('whitelist') ? el.getAttribute('whitelist').split(',') : [];
      const blacklist = el.getAttribute('blacklist') ? el.getAttribute('blacklist').split(',') : [];

      el.addEventListener('content-selected', function(e) {
        store.dispatch('whppt/editor/clearSelectedContent');

        store.dispatch('whppt/editor/selectContent', { el, value: binding.value });
      });

      el.addEventListener('click', function(e) {
        if (!menuIsInState(store, MENUSTATES.SELECT)) return;
        e.stopPropagation();

        store.dispatch('whppt/editor/clearSelectedContent');
        store.dispatch('whppt/editor/clearSelectedComponent');

        store.dispatch('whppt/editor/selectComponent', {
          el,
          value: { value: binding.value, whitelist, blacklist },
        });

        store.dispatch('whppt/editor/doEditInSidebar', 'Content');
      });

      el.addEventListener('mouseover', function(e) {
        e.preventDefault();
        if (menuIsInState(store, MENUSTATES.SELECT)) $whppt.mouseoverContent(el);
      });

      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutContent(el);
      });
    },
    // unbind: clear event listeners
  });
};
