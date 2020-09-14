import Vue from 'vue';
import SimpleComponentClickHandler from './_simpleComponentClickHandler';

/*
 * @deprecated
 */
export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('whppt-default', {
    bind(el, binding) {
      const value = { value: binding.value };
      el.whppthandler = SimpleComponentClickHandler({ store, menuIsInState, MENUSTATES, name: 'default', el, value });
      el.addEventListener('click', el.whppthandler);
      el.addEventListener('mouseover', function(e) {
        if (!menuIsInState(store, MENUSTATES.SELECT)) return;
        $whppt.mouseoverComponent(el);
      });
      el.addEventListener('mouseout', function(e) {
        $whppt.mouseoutComponent(el);
      });
    },
    unbind(el) {
      el.removeEventListener('click', el.whppthandler);
      delete el.whppthandler;
    },
    update(el, binding) {
      el.removeEventListener('click', el.whppthandler);
      const value = { value: binding.value };
      el.whppthandler = SimpleComponentClickHandler({ store, menuIsInState, MENUSTATES, name: 'default', el, value });
      el.addEventListener('click', el.whppthandler);
    },
  });
};
