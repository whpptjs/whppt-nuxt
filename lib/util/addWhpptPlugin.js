import { forEach } from 'lodash';
import { menuIsInState, MENUSTATES } from './menuState';
import registerDynamicDirectives from './registerDynamicDirectives';

export default function addWhpptPlugin(context, plugin) {
  if (plugin.editors) {
    forEach(plugin.editors, editor => {
      if (editor.directive) {
        return editor.directive({
          ...context,
          menuIsInState,
          MENUSTATES,
          definition: editor,
        });
      }

      registerDynamicDirectives([
        {
          ...context,
          menuIsInState,
          MENUSTATES,
          definition: editor,
        },
      ]);
    });
  }
}
