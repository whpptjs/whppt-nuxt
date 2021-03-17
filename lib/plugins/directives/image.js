import Vue from 'vue';
import SimpleComponentClickHandler from './_simpleComponentClickHandler';

export default ({ store, app: { $whppt } }, menuIsInState, MENUSTATES) => {
  Vue.directive('whppt-image', {
    bind(el, binding) {
      const _sizes = el.getAttribute('data-sizes');
      const sizes = _sizes ? JSON.parse(_sizes) : {};

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
        const value = { value: binding.value };
        value.sizes = sizes;

        el.whppthandler = SimpleComponentClickHandler({
          store,
          menuIsInState,
          MENUSTATES,
          name: 'EditImage',
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
      el.removeEventListener('click', el.whppthandler);
      const _sizes = el.getAttribute('data-sizes');
      const sizes = _sizes ? JSON.parse(_sizes) : {};
      const value = { value: binding.value };
      value.sizes = sizes;
      el.whppthandler = SimpleComponentClickHandler({
        store,
        menuIsInState,
        MENUSTATES,
        name: 'EditImage',
        el,
        value,
      });
      el.addEventListener('click', el.whppthandler);
    },
  });
};
