import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('carousel', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        $whppt.clearEditData();
        $whppt.clearContents();
        $whppt.clearSelected();
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        store.commit('whppt-nuxt/editor/editInSidebar', 'carousel');
        $whppt.select(el, binding.value);
        $whppt.edit(el, binding.value);
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
