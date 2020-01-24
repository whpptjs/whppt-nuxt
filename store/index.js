import systemModule from './modules/system';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default ({ store }, inject) => {
  const namespace = 'whppt-nuxt';
  if (!store)
    throw new Error(
      'Vuex is required to use Whppt Nuxt, please initialise a Vuex store: https://nuxtjs.org/guide/vuex-store/'
    );

  store.registerModule(namespace, systemModule(options), {
    preserveState: Boolean(store.state[namespace]),
  });
};
