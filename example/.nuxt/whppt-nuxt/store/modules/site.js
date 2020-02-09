export default options => ({
  namespaced: true,
  state: () => ({
    options,
    footer: undefined,
  }),
  actions: {
    saveFooter({ state, commit }) {
      this.$whppt.saveFooter(state.footer).then(footer => {
        commit('footerLoaded', footer);
      });
    },
    loadFooter({ commit }) {
      this.$whppt.loadFooter().then(footer => {
        commit('footerLoaded', footer);
      });
    },
  },
  mutations: {
    footerLoaded(state, footer) {
      state.footer = footer;
    },
  },
  getters: {},
});
