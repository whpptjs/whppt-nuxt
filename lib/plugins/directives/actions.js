import Vue from 'vue';

export default ({ store, app: { $whppt } }, menuIsInState, MENUSTATES, definition) => {
  Vue.directive('whppt-actions', {
    bind(el, binding) {
      // console.log('🚀 ~ file: actions.js ~ line 7 ~ bind ~ binding.value', binding.value);
      // console.log('🚀 ~ file: actions.js ~ line 7 ~ bind ~ el', el);
      // const value = { value: binding.value };
    },
    unbind(el) {},
    update(el, binding) {
      const inEditor = menuIsInState(store, MENUSTATES.SELECT);

      el.addEventListener('mouseover', () => appendActionsMenu(el, inEditor));
      el.addEventListener('mouseleave', () => removeActionsMenu(el, inEditor));

      appendActionsMenu(el, inEditor);
    },
  });
};

function appendActionsMenu(el, inEditor) {
  if (inEditor) {
    // el.style.position = 'relative';
    // const element = document.createElement('div');
    // element.textContent = 'Hello';
    // el.appendChild(element);
    // console.log('Appending stuff');
  }
}

function removeActionsMenu(el, inEditor) {
  if (inEditor) {
    // console.log('Removing stuff');
  }
}
