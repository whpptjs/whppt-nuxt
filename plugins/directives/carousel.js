import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('carousel', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        store.dispatch('whppt-nuxt/editor/clearEditData');
        $whppt.clearContents();
        $whppt.clearSelected();
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        store.commit('whppt-nuxt/editor/editInSidebar', 'carousel');
        $whppt.select(el, binding.value);
        store.dispatch('whppt-nuxt/editor/edit', { el, value: binding.value });
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
