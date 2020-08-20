import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('content', {
    bind(el, binding) {
      el.addEventListener('content-selected', function(e) {
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');

        const whitelist = el.getAttribute('data-whitelist');
        const blacklist = el.getAttribute('data-blacklist');

        store.dispatch('whppt-nuxt/editor/selectContent', { el, value: binding.value, whitelist, blacklist });
      });

      el.addEventListener('click', function(e) {
        if (!menuIsInState(store, MENUSTATES.SELECT)) return;
        e.stopPropagation();
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');

        const whitelist = el.getAttribute('data-whitelist');
        const blacklist = el.getAttribute('data-blacklist');

        store.dispatch('whppt-nuxt/editor/selectComponent', {
          el,
          value: { value: binding.value, whitelist, blacklist },
        });
        store.commit('whppt-nuxt/editor/editInSidebar', 'eContent');
      });

      el.addEventListener('mouseover', function(e) {
        e.preventDefault();
        if (menuIsInState(store, MENUSTATES.SELECT)) $whppt.mouseoverContent(el);
      });

      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutContent(el);
      });
    },
  });
};
