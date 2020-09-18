import editorModule from './modules/editor';
import siteModule from './modules/site';
import pageModule from './modules/page';
import securityModule from './modules/security';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default ({ store }, inject) => {
  /* TODO: Rename namespace to simply whppt */
  const namespace = 'whppt-nuxt';
  if (!store)
    throw new Error(
      'Vuex is required to use Whppt Nuxt, please initialise a Vuex store: https://nuxtjs.org/guide/vuex-store/'
    );

  const modules = [editorModule, siteModule, pageModule, securityModule];

  for (const module in modules) {
    console.log(module);
    // store.registerModule
  }

  store.registerModule(`${namespace}/editor`, editorModule(options), {
    preserveState: Boolean(store.state[`${namespace}/editor`]),
  });

  store.registerModule(`${namespace}/site`, siteModule(options), {
    preserveState: Boolean(store.state[`${namespace}/site`]),
  });

  store.registerModule(`${namespace}/page`, pageModule(options), {
    preserveState: Boolean(store.state[`${namespace}/page`]),
  });

  store.registerModule(`${namespace}/security`, securityModule(options), {
    preserveState: Boolean(store.state[`${namespace}/security`]),
  });
};
