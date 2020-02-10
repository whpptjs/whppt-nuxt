import Vue from 'vue';
import notifyContent from './_notifyContent';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('container', {
    bind(el, binding) {
      el.addEventListener('content-selected', function(e) {
        console.log('CONTENT-SELECTED');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        store.dispatch('whppt-nuxt/editor/selectContent', { el, value: binding.value });
      });
      el.addEventListener('click', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        e.stopPropagation();

        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        const property = el.getAttribute('data-property');
        store.dispatch('whppt-nuxt/editor/selectComponent', {
          el,
          value: { value: binding.value[property], property },
        });
        notifyContent(el);
        store.commit('whppt-nuxt/editor/editInSidebar', 'eContent');
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
