import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('content', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        store.commit('whppt-nuxt/editor/closeSidebar');
        $whppt.clearEditData();
        $whppt.clearContents();
        // $whppt.clearSelected();

        if (menuIsInState(MENUSTATES.SELECT)) {
          e.preventDefault();
          $whppt.clearEditingElementFormatting();
          $whppt.selectContents(el, binding.value);
        }

        if (menuIsInState(MENUSTATES.CONTENT)) {
          $whppt.clearEditData();
          store.commit('whppt-nuxt/editor/editInSidebar', 'eContent');
          $whppt.select(el, binding.value);
          $whppt.edit(el, binding.value);
        }
      });
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT) && !menuIsInState(MENUSTATES.CONTENT)) return;
        $whppt.mouseover(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseout(el);
      });
    },
  });
};
