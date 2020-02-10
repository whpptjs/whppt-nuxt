import Vue from 'vue';
import notifyContent from './_notifyContent';

// export default ({ store }, whppt) => {
export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('plainText', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        e.stopPropagation();

        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        const property = el.getAttribute('data-property');
        store.dispatch('whppt-nuxt/editor/selectComponent', { el, value: { value: binding.value, property } });
        notifyContent(el);
        store.commit('whppt-nuxt/editor/editInSidebar', 'plainText');
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
