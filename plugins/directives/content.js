import Vue from 'vue';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('content', {
    bind(el, binding) {
      el.addEventListener('content-selected', function(e) {
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        store.dispatch('whppt-nuxt/editor/selectContent', { el, value: binding.value });
      });

      el.addEventListener('click', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        e.stopPropagation();
        store.dispatch('whppt-nuxt/editor/clearSelectedContent');
        store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
        const filter = el.getAttribute('data-components');
        // const filter = _filter && _filter.split(',').trim();
        store.dispatch('whppt-nuxt/editor/selectComponent', { el, value: { value: binding.value, filter } });
        store.commit('whppt-nuxt/editor/editInSidebar', 'eContent');
      });
      el.addEventListener('mouseover', function(e) {
        e.preventDefault();
        if (menuIsInState(MENUSTATES.SELECT)) $whppt.mouseoverContent(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutContent(el);
      });
    },
  });
};
