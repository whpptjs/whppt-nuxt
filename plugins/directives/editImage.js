import Vue from 'vue';
import SimpleComponentClickHandler from './_simpleComponentClickHandler';

export default ({ store, app: { $whppt }, menuIsInState, MENUSTATES }) => {
  Vue.directive('editImage', {
    bind(el, binding) {
      const _sizes = el.getAttribute('data-sizes');
      const sizes = _sizes ? JSON.parse(_sizes) : {};
      const value = { value: binding.value, sizes };
      el.whppthandler = SimpleComponentClickHandler({ store, menuIsInState, MENUSTATES, name: 'editImage', el, value });
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
      const _sizes = el.getAttribute('data-sizes');
      const sizes = _sizes ? JSON.parse(_sizes) : {};
      const value = { value: binding.value, sizes };
      el.whppthandler = SimpleComponentClickHandler({ store, menuIsInState, MENUSTATES, name: 'editImage', el, value });
      el.addEventListener('click', el.whppthandler);
    },
  });
};
