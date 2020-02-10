import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('listing', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        if (!menuIsInState(MENUSTATES.LISTING)) return;

        $whppt.clearEditData();
        $whppt.clearContents();
        $whppt.clearSelected();

        $whppt.select(el, binding.value.parent);
        $whppt.formatSelectedContentsElement();
        $whppt.edit(el, binding.value);

        store.commit('whppt-nuxt/editor/editInModal', 'atdw');
      });
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(MENUSTATES.LISTING)) return;
        $whppt.mouseover(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseout(el);
      });
    },
  });
};
