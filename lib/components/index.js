import Vue from 'vue';
import content from './content';
import icons from './icons';
import WhpptLink from './content/WhpptLink';
import Anchor from './content/Anchor';

const components = { ...content, ...icons };

const options = JSON.parse(`<%= JSON.stringify(options) %>`);
const { componentPrefix = 'W' } = options;

/*
 * manually add in whppt-link to avoid prefix.
 *
 * TODO: In future id like to change the below components to use the componentPrefix
 * eg. w-link rather than whppt-link, whppt-link could stay have both alias
 * currently both have been added into components, below remains for compatibility
 * */
Vue.component('whppt-link', WhpptLink);
Vue.component('Anchor', Anchor);

for (const name in components) {
  Vue.component(`${componentPrefix}${name}`, {
    extends: components[name],
  });
}
