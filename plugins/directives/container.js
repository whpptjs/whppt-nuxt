import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('container', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        store.dispatch('whppt-nuxt/editor/selectComponent');
        store.commit('whppt-nuxt/editor/editInSidebar', 'Container');
      });
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        $whppt.mouseover(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseout(el);
      });
    },
  });
};
