import dynamicDirective from '../plugins/directives/dynamic';

/*
 * @param {Object} context
 * @param {Function} menuIsInState
 * @param {Object} MENUSTATES
 * @param {Object} directives
 * */
function registerDynamicDirective(context, menuIsInState, MENUSTATES, directive) {
  if (!directive.name) throw new Error('A "name" must be provided to successfully register a directive.');
  dynamicDirective(context, menuIsInState, MENUSTATES, directive);
}

export default registerDynamicDirective;
