function commitTimeout(f) {
  if (process.client) {
    setTimeout(() => {
      f();
    }, 100);
  } else {
    f();
  }
}

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
      return this.$whppt.deletePage(state.page._id).then(() => {
        state.page = undefined;
      });
    },
    // publishListing({ state }, listing) {
    //   return this.$whppt.publishListing(listing).then(() => {
    //     this.$toast.global.editorSuccess('Listing & Listing Page Published');
    //   });
    // },
    publishPage({ state }) {
      return this.$whppt.publishPage(state.page).then(() => {
        state.page.published = true;
        this.$toast.global.editorSuccess('Page Published');
      });
    },
    unpublishPage({ state }) {
      return this.$whppt.unpublishPage(state.page._id).then(() => {
        state.page.published = false;
        this.$toast.global.editorSuccess('Page Unpublished');
      });
    },
    loadPage({ commit }, { slug }) {
      return this.$whppt.loadPage({ slug }).then(page => {
        commitTimeout(() => commit('pageLoaded', page));
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
