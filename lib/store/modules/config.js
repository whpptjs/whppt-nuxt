export default options => ({
  namespaced: true,
  state: () => ({
    domain: undefined,
    domains: [],
  }),
  actions: {
    loadDomain({ commit }, hostname) {
      const { $axios, $whppt } = this.$whppt.context;
      return $axios.$get(`${$whppt.apiPrefix}/config/loadDomain?hostname=${hostname}`).then(({ domain, domains }) => {
        commit('DOMAINS_LOADED', { domain, domains });
      });
    },
    addNewDomain({ commit }, { domain }) {
      const { $axios, $whppt } = this.$whppt.context;
      return $axios.$post(`${$whppt.apiPrefix}/config/addNewDomain`, { domain }).then(domain => {
        commit('DOMAIN_ADDED', { domain });
      });
    },
  },
  mutations: {
    DOMAINS_LOADED(state, { domain, domains }) {
      state.domain = domain || {};
      state.domains = domains;
    },
    DOMAIN_ADDED(state, { domain }) {
      state.domains.push(domain);
    },
    DOMAIN_CHANGED(state, { domain }) {
      state.domain = domain;
    },
  },
});
