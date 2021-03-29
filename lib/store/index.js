import editorModule from './modules/editor';
import siteModule from './modules/site';
import pageModule from './modules/page';
import securityModule from './modules/security';
import dashboardModule from './modules/dashboard';
import configModule from './modules/config';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default ({ store }, inject) => {
  const namespace = 'whppt';

  if (!store) {
    throw new Error(
      'Vuex is required to use Whppt Nuxt, please initialise a Vuex store: https://nuxtjs.org/guide/vuex-store/'
    );
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

  store.registerModule(`${namespace}/dashboard`, dashboardModule(options), {
    preserveState: Boolean(store.state[`${namespace}/dashboard`]),
  });

  store.registerModule(`${namespace}/config`, configModule(options), {
    preserveState: Boolean(store.state[`${namespace}/config`]),
  });
};
