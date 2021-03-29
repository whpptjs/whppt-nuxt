const SimpleContentClickHandler = ({ store, el, value }) =>
  function(e) {
    store.dispatch('whppt/editor/clearSelectedContent');
    store.dispatch('whppt/editor/selectContent', { el, value });
  };

export default SimpleContentClickHandler;
