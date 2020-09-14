import Vue from 'vue';
import notifyContent from './_notifyContent';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('listings', {
    bind(el, binding) {
      el.addEventListener('content-selected', function(e) {
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        store.dispatch('whppt-nuxt/editor/selectContent', { el, value: binding.value });
      });
      el.addEventListener('click', function(e) {
        if (!menuIsInState(store, MENUSTATES.SELECT)) return;
        e.stopPropagation();

        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        const property = el.getAttribute('data-property');
        store.dispatch('whppt-nuxt/editor/selectComponent', { el, value: { value: binding.value, property } });
        notifyContent(el);
        store.commit('whppt-nuxt/editor/editInSidebar', 'listings');
      });
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(store, MENUSTATES.SELECT)) return;
        $whppt.mouseoverContent(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutContent(el);
      });
    },
  });
};
