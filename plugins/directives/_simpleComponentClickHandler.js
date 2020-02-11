import notifyContent from './_notifyContent';

const SimpleComponentClickHandler = ({ store, menuIsInState, MENUSTATES, name, el, value }) =>
  function(e) {
    if (!menuIsInState(MENUSTATES.SELECT)) return;
    e.stopPropagation();

    store.dispatch('whppt-nuxt/editor/clearSelectedComponent');
    store.dispatch('whppt-nuxt/editor/clearSelectedContent');
    store.dispatch('whppt-nuxt/editor/selectComponent', { el, value });
    notifyContent(el);
    store.commit('whppt-nuxt/editor/editInSidebar', name);
  };

export default SimpleComponentClickHandler;
