import editorModule from './modules/editor';
import siteModule from './modules/site';
import pageModule from './modules/page';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default ({ store }, inject) => {
  const namespace = 'whppt-nuxt';
  if (!store)
    throw new Error(
      'Vuex is required to use Whppt Nuxt, please initialise a Vuex store: https://nuxtjs.org/guide/vuex-store/'
    );

  store.registerModule(`${namespace}/editor`, editorModule(options), {
    preserveState: Boolean(store.state[`${namespace}/editor`]),
  });

  store.registerModule(`${namespace}/site`, siteModule(options), {
    preserveState: Boolean(store.state[`${namespace}/site`]),
  });

  store.registerModule(`${namespace}/page`, pageModule(options), {
    preserveState: Boolean(store.state[`${namespace}/page`]),
  });
};
