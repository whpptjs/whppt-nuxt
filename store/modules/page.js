export default options => ({
  namespaced: true,
  state: () => ({
    options,
    page: undefined,
  }),
  actions: {
    load({ commit }, { slug }) {
      return this.$whppt
        .loadPage({ slug })
        .then(page => {
          commit('loaded', page);
        })
        .catch(err => {
          if (err.response.status === 404) commit('loaded', { slug });
          throw err;
        });
    },
    save({ commit }) {
      return this.$whppt.savePage().then(page => {
        commit('loaded', page);
      });
    },
  },
  mutations: {
    loaded(state, page) {
      state.page = page;
    },
  },
  getters: {},
});
