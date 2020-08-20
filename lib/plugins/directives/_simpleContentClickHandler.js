const SimpleContentClickHandler = ({ store, el, value }) =>
  function(e) {
    store.dispatch('whppt-nuxt/editor/clearSelectedContent');
    store.dispatch('whppt-nuxt/editor/selectContent', { el, value });
  };

export default SimpleContentClickHandler;
