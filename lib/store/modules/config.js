import { findIndex } from 'lodash';

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
    saveDomain({ commit }, { domain }) {
      const { $axios, $whppt } = this.$whppt.context;
      return $axios.$post(`${$whppt.apiPrefix}/config/saveDomain`, { domain }).then(domain => {
        commit('DOMAIN_SAVED', { domain });
        return domain;
      });
    },
    changeDomain({ commit, dispatch }, { domain }) {
      const { $axios, $whppt } = this.$whppt.context;
      return $axios
        .$post(`${$whppt.apiPrefix}/config/swapActiveDomain`, { domain })
        .then(({ newDomain, oldDomain }) => {
          return Promise.all([
            dispatch('whppt-nuxt/site/loadNav', { domainId: newDomain._id }, { root: true }),
            dispatch('whppt-nuxt/site/loadFooter', { domainId: newDomain._id }, { root: true }),
          ]).then(() => {
            commit('DOMAIN_CHANGED', { newDomain, oldDomain });
          });
        });
    },
  },
  mutations: {
    DOMAINS_LOADED(state, { domain, domains }) {
      state.domain = domain || {};
      state.domains = domains;
    },
    DOMAIN_SAVED(state, { domain }) {
      const index = findIndex(state.domains, d => d._id === domain._id);
      if (index === -1) state.domains.push(domain);
      else state.domains.splice(index, 1, domain);
    },
    DOMAIN_CHANGED(state, { oldDomain, newDomain }) {
      if (oldDomain && oldDomain._id) {
        const oldIndex = findIndex(state.domains, d => d._id === oldDomain._id);
        if (oldIndex !== -1) state.domains.splice(oldIndex, 1, oldDomain);
      }
      const newIndex = findIndex(state.domains, d => d._id === newDomain._id);
      if (newIndex !== -1) state.domains.splice(newIndex, 1, newDomain);
      state.domain = newDomain;
    },
  },
});
