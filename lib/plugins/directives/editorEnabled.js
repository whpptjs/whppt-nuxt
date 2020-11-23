import Vue from 'vue';

export default () => {
  // can't observe missing attribute within other directives. 
  // binding false to an attribute hides the attribute in the dom
  // this directive fixes the attribute value that can't be observed,
  // by creating an additional string value attribute.
  Vue.directive('whppt-editor-enabled', {
    bind(el, binding) {
      const value = !binding.value
      el.setAttribute('editor-disabled', value.toString());
    },
    update(el, binding) {
      const value = !binding.value
      el.setAttribute('editor-disabled', value.toString());
    },
  });
};
