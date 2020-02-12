export default options => ({
  namespaced: true,
  state: () => ({
    options,
    page: undefined,
  }),
  actions: {
    createPage({ commit }, _page) {
      return this.$whppt.createPage(_page).then(page => {
        commit('pageLoaded', page);
      });
    },
    savePage({ state, commit }) {
      return this.$whppt.savePage(state.page).then(page => {
        commit('pageLoaded', page);
      });
    },
    loadPage({ commit }, { slug }) {
      return this.$whppt.loadPage({ slug }).then(page => {
        commit('pageLoaded', page);
      });
    },
  },
  mutations: {
    pageLoaded(state, page) {
      state.page = page;
    },
  },
  getters: {},
});
