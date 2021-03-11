import Vue from 'vue';
import startCase from 'lodash/startCase';
import notifyContent from './_notifyContent';

export default ({ store }, menuIsInState, MENUSTATES, definition) => {
  Vue.directive('whppt-actions', {
    bind(el, binding) {
      appendActionsMenu(
        el,
        menuIsInState(store, MENUSTATES.SELECT),
        binding.value.actions,
        binding.value.content,
        store
      );

      el.addEventListener('mouseenter', () =>
        appendActionsMenu(
          el,
          menuIsInState(store, MENUSTATES.SELECT),
          binding.value.actions,
          binding.value.content,
          store
        )
      );
      el.addEventListener('mouseleave', () =>
        removeActionsMenu(
          el,
          menuIsInState(store, MENUSTATES.SELECT),
          binding.value.actions,
          binding.value.content,
          store
        )
      );
    },
    unbind(el) {
      el.removeEventListener('mouseenter', () => appendActionsMenu(el, menuIsInState(store, MENUSTATES.SELECT)));
      el.removeEventListener('mouseleave', () => removeActionsMenu(el, menuIsInState(store, MENUSTATES.SELECT)));
    },
    update(el, binding) {},
  });
};

function appendActionsMenu(el, inEditor, actions = [], content = {}, store) {
  if (inEditor) {
    el.style.position = 'relative';

    const menu = document.createElement('div');
    menu.classList.add('whppt-actions');

    const unorderedList = document.createElement('ul');

    const componentName = document.createElement('span');
    componentName.textContent = startCase(content.componentType);

    unorderedList.appendChild(componentName);

    const listElements = [];

    for (const menuItem of actions) {
      const li = document.createElement('li');

      li.onclick = ev => {
        ev.stopPropagation();

        store.dispatch('whppt/editor/clearSelectedComponent');
        store.dispatch('whppt/editor/clearSelectedContent');
        store.dispatch('whppt/editor/selectComponent', { el, value: { value: content } });

        notifyContent(el);

        return menuItem.action({ store, el, content, ev });
      };

      li.textContent = menuItem.label;

      li.className += ` ${menuItem.classes}`;

      listElements.push(li);
    }

    for (const li of listElements) {
      unorderedList.appendChild(li);
    }

    menu.appendChild(unorderedList);

    el.appendChild(menu);
  }
}

function removeActionsMenu(el, inEditor) {
  if (inEditor) {
    const menus = document.getElementsByClassName('whppt-actions');

    for (const menu of menus) {
      menu.remove();
    }
  }
}
