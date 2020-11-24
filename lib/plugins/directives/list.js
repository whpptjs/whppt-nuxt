import Vue from 'vue';
import SimpleComponentClickHandler from './_simpleComponentClickHandler';

export default ({ store, app: { $whppt } }, menuIsInState, MENUSTATES) => {
  Vue.directive('whppt-list', {
    bind(el, binding) {
      const property = el.getAttribute('data-property');
      const value = { value: binding.value.data, property, addNew: binding.value.addNew };

      let _disabled = true;

      const disableDirective = () => {
        if (_disabled) return;
        el.removeEventListener('click', el.whppthandler);
        el.removeEventListener('mouseover', el.whpptMouseoverHandler);
        el.removeEventListener('mouseout', el.whpptMouseoutHandler);
        delete el.whppthandler;
        _disabled = true;
      };

      const enableDirective = () => {
        if (!_disabled) return;

        el.whppthandler = SimpleComponentClickHandler({
          store,
          menuIsInState,
          MENUSTATES,
          name: 'list',
          el,
          value,
        });
        el.whpptMouseoverHandler = function() {
          if (!menuIsInState(store, MENUSTATES.SELECT)) return;
          $whppt.mouseoverComponent(el);
        };
        el.whpptMouseoutHandler = function() {
          $whppt.mouseoutComponent(el);
        };
        el.addEventListener('click', el.whppthandler);
        el.addEventListener('mouseover', el.whpptMouseoverHandler);
        el.addEventListener('mouseout', el.whpptMouseoutHandler);
        _disabled = false;
      };

      const callback = mutations => {
        for (const mutation of mutations) {
          if (mutation.attributeName === 'editor-disabled') {
            const disabled = el.getAttribute('editor-disabled') === 'true';
            if (disabled) return disableDirective();
            enableDirective();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(el, { attributes: true });

      const disabled = el.getAttribute('editor-disabled') === 'true';
      if (disabled) return;
      enableDirective();
    },
    unbind(el, binding) {
      const disabled = el.getAttribute('editor-disabled') === 'true';
      if (disabled) return;
      el.removeEventListener('click', el.whppthandler);
      delete el.whppthandler;
    },
    update(el, binding) {
      const disabled = el.getAttribute('editor-disabled') === 'true';
      if (disabled) return;
      const property = el.getAttribute('data-property');
      el.removeEventListener('click', el.whppthandler);
      const value = { value: binding.value.data, property, addNew: binding.value.addNew };
      el.whppthandler = SimpleComponentClickHandler({
        store,
        menuIsInState,
        MENUSTATES,
        name: 'list',
        el,
        value,
      });
      el.addEventListener('click', el.whppthandler);
    },
  });
};
