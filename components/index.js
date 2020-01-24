import Vue from 'vue';
import components from './lib';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);
const { componentPrefix = 'W' } = options;

for (const name in components) {
  Vue.component(`${componentPrefix}${name}`, {
    extends: components[name],
  });
}
