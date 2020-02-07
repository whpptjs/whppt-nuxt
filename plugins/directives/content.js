import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('content', {
    bind(el, binding) {
      el.addEventListener('click', function(e) {
        $whppt.clearContents();

        if (menuIsInState(MENUSTATES.SELECT)) {
          e.stopPropagation();
          // $whppt.clearSelected();
          // $whppt.clearEditData();
          // $whppt.clearEditingElementFormatting();
          $whppt.selectContents(el, binding.value);
        }

        if (menuIsInState(MENUSTATES.CONTENT)) {
          e.stopPropagation();
          // e.preventDefault();
          $whppt.clearEditData();
          store.commit('whppt-nuxt/editor/editInSidebar', 'eContent');
          $whppt.select(el, binding.value);
          $whppt.editContent(el, binding.value);
        }
      });
      el.addEventListener('mouseover', function(e) {
        e.preventDefault();
        if (!menuIsInState(MENUSTATES.SELECT) && !menuIsInState(MENUSTATES.CONTENT)) return;
        $whppt.mouseover(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseout(el);
      });
    },
  });
};
