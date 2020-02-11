import Vue from 'vue';
import notifyContent from './_notifyContent';

const ListingComponentClickHandler = ({ store, menuIsInState, MENUSTATES, el, binding }) =>
  function(e) {
    if (!menuIsInState(MENUSTATES.SELECT)) return;
    e.stopPropagation();
    store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
    store.dispatch('whppt-nuxt/editor/clearSelectedContent');
    const property = el.getAttribute('data-property');
    store.dispatch('whppt-nuxt/editor/selectComponent', { el, value: { value: binding.value, property } });
    notifyContent(el);
    store.commit('whppt-nuxt/editor/editInModal', 'atdw');
  };

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('listing', {
    bind(el, binding) {
      el.whppthandler = ListingComponentClickHandler({
        store,
        menuIsInState,
        MENUSTATES,
        el,
        binding,
      });
      el.addEventListener('click', el.whppthandler);
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(MENUSTATES.SELECT)) return;
        $whppt.mouseoverComponent(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutComponent(el);
      });
    },
    unbind(el, binding) {
      el.removeEventListener('click', el.whppthandler);
      delete el.whppthandler;
    },
    update(el, binding) {
      el.removeEventListener('click', el.whppthandler);
      el.whppthandler = ListingComponentClickHandler({
        store,
        menuIsInState,
        MENUSTATES,
        el,
        binding,
      });
      el.addEventListener('click', el.whppthandler);
    },
  });
};
