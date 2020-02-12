import Vue from 'vue';
import notifyContent from './_notifyContent';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('container', {
    bind(el, binding) {
      el.addEventListener('content-selected', function(e) {
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        const property = el.getAttribute('data-property');
        store.dispatch('whppt-nuxt/editor/selectContent', { el, value: binding.value[property] });
      });
      el.addEventListener('click', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        e.stopPropagation();

        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        const property = el.getAttribute('data-property');
        const filter = el.getAttribute('data-components');

        store.dispatch('whppt-nuxt/editor/selectComponent', {
          el,
          value: { value: binding.value[property], property, filter },
        });
        notifyContent(el);
        store.commit('whppt-nuxt/editor/editInSidebar', 'eContent');
      });
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        e.stopPropagation();
        $whppt.mouseoverContent(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutContent(el);
      });
    },
  });
};
