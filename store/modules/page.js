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
        this.$toast.global.editorSuccess('Page Saved');
        commit('pageLoaded', page);
      });
    },
    deletePage({ state }) {
      return this.$whppt.deletePage(state.page._id);
    },
    publishPage({ state }) {
      return this.$whppt.publishPage(state.page).then(() => {
        this.$toast.global.editorSuccess('Page Published');
      });
    },
    unpublishPage({ state }) {
      return this.$whppt.unpublishPage(state.page);
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
