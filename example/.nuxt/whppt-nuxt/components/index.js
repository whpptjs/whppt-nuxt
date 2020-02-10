import Vue from 'vue';
import components from './lib';

const options = JSON.parse(`{"baseAPIUrl":"http://localhost:3000","componentPrefix":"W","components":[{"key":"CardCarousel","value":"Card Carousel","editorType":"wCarousel","displayType":"wCardCarousel","reversed":false,"title":"","description":"","items":[{"title":"","description":"","ctaText":""}]}],"templates":[{"key":"home","label":"Home","init":{"contents":[]}},{"key":"generic","label":"Generic","init":{"contents":[]}}]}`);
const { componentPrefix = 'W' } = options;

for (const name in components) {
  Vue.component(`${componentPrefix}${name}`, {
    extends: components[name],
  });
}
