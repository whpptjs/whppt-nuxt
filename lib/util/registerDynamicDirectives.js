import { forEach } from 'lodash';
import dynamicDirective from '../plugins/directives/dynamic';

/*
 * @param {Object} context
 * @param {Function} menuIsInState
 * @param {Object} MENUSTATES
 * @param {Array} directives
 * */
function registerDynamicDirectives(context, menuIsInState, MENUSTATES, directives) {
  forEach(directives, dir => {
    dynamicDirective({
      ...context,
      menuIsInState,
      MENUSTATES,
      definition: dir,
    });
  });
}

export default registerDynamicDirectives;
