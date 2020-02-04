export default options => ({
  namespaced: true,
  state: () => ({
    options,
    page: undefined,
  }),
  mutations: {
    loaded(state, page) {
      if (!page) return (state.page = {});
      state.page = page;
    },
  },
  actions: {
    load({ commit }, { slug }) {
      return this.$whppt
        .loadPage({ slug })
        .then(page => {
          console.log('from store', page);
          commit('loaded', page);
        })
        .catch(err => {
          if (err.response.status === 404) commit('loaded', {});
          throw err;
        });
    },
    save({ commit }, newPage) {
      return this.$whppt.savePage(newPage).then(page => {
        console.log('savePage', page);
        commit('loaded', page);
        return page;
      });
    },
  },
  getters: {},
});
