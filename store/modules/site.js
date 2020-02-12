export default options => ({
  namespaced: true,
  state: () => ({
    options,
    footer: undefined,
    nav: undefined,
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
    saveNav({ state, commit }) {
      this.$whppt.saveNav(state.footer).then(nav => {
        commit('navLoaded', nav);
      });
    },
    loadNav({ commit }) {
      this.$whppt.loadNav().then(nav => {
        commit('navLoaded', nav);
      });
    },
  },
  mutations: {
    footerLoaded(state, footer) {
      state.footer = footer;
    },
    navLoaded(state, nav) {
      state.nav = nav;
    },
  },
  getters: {},
});
