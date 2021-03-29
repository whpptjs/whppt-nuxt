import notifyContent from './_notifyContent';

const SimpleComponentClickHandler = ({ store, menuIsInState, MENUSTATES, name, el, value }) =>
  function(e) {
    if (!menuIsInState(store, MENUSTATES.SELECT)) return;
    e.stopPropagation();

    store.dispatch('whppt/editor/clearSelectedComponent');
    store.dispatch('whppt/editor/clearSelectedContent');
    store.dispatch('whppt/editor/selectComponent', { el, value });
    notifyContent(el);
    store.dispatch('whppt/editor/doEditInSidebar', name);
  };

export default SimpleComponentClickHandler;
