import Vue from 'vue';
import SimpleComponentClickHandler from './_simpleComponentClickHandler';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('whppt-rich-text', {
    bind(el, binding) {
      const property = el.getAttribute('data-property');

      const hideMenu = el.getAttribute('data-hide-menu');
      const hideStyle = el.getAttribute('data-hide-style');
      const hideHeaders = el.getAttribute('data-hide-headers');
      const hideLists = el.getAttribute('data-hide-lists');
      const hideLinks = el.getAttribute('data-hide-links');

      const value = { value: binding.value, property, hideMenu, hideStyle, hideHeaders, hideLists, hideLinks };
      el.whppthandler = SimpleComponentClickHandler({ store, menuIsInState, MENUSTATES, name: 'richText', el, value });
      el.addEventListener('click', el.whppthandler);
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(store, MENUSTATES.SELECT)) return;
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
      const property = el.getAttribute('data-property');
      const hideMenu = el.getAttribute('data-hide-menu');
      const hideStyle = el.getAttribute('data-hide-style');
      const hideHeaders = el.getAttribute('data-hide-headers');
      const hideLists = el.getAttribute('data-hide-lists');
      const value = { value: binding.value, property, hideMenu, hideStyle, hideHeaders, hideLists };
      el.whppthandler = SimpleComponentClickHandler({ store, menuIsInState, MENUSTATES, name: 'richText', el, value });
      el.addEventListener('click', el.whppthandler);
    },
  });
};
