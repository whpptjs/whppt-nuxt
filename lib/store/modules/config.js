export default options => ({
  namespaced: true,
  state: () => ({
    domainId: process.client ? localStorage.getItem('whpptCurrentDomainId') : undefined,
    domain: undefined,
    domains: [],
  }),
  actions: {
    loadDomain({ commit, state }, hostname) {
      const { $axios, $whppt } = this.$whppt.context;
      return $axios
        .$get(`${$whppt.apiPrefix}/config/loadDomain?hostname=${hostname}&domainId=${state.domainId}`)
        .then(({ domain, domains }) => {
          commit('DOMAINS_LOADED', { domain, domains });
        });
    },
    addNewDomain({ commit }, { domain }) {
      const { $axios, $whppt } = this.$whppt.context;
      return $axios.$post(`${$whppt.apiPrefix}/config/addNewDomain`, { domain }).then(domain => {
        commit('DOMAIN_ADDED', { domain });
      });
    },
    changeDomain({ commit, dispatch }, { domain }) {
      return Promise.all([
        dispatch('whppt-nuxt/site/loadNav', { domain }, { root: true }),
        dispatch('whppt-nuxt/site/loadFooter', { domain }, { root: true }),
      ]).then(() => {
        commit('DOMAIN_CHANGED', { domain });
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
      state.domainId = domain._id;
      localStorage.setItem('whpptCurrentDomainId', domain._id);
    },
  },
});
