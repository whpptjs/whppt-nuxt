import Vue from 'vue';
import notifyContent from './_notifyContent';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('linkGroup', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        e.stopPropagation();

        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        store.dispatch('whppt-nuxt/editor/selectComponent', { el, value: { value: binding.value } });
        notifyContent(el);
        store.commit('whppt-nuxt/editor/editInSidebar', 'linkGroup');
      });
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        $whppt.mouseoverComponent(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutComponent(el);
      });
    },
  });
};
