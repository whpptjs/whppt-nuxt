export default options => ({
  namespaced: true,
  state: () => ({
    options,
    footer: undefined,
    nav: undefined,
  }),
  actions: {
    saveFooter({ state, commit }) {
      return this.$whppt.saveFooter(state.footer).then(footer => {
        commit('footerLoaded', footer);
      });
    },
    loadFooter({ commit }) {
      return this.$whppt.loadFooter().then(footer => {
        commit('footerLoaded', footer);
      });
    },
    saveNav({ state, commit }) {
      return this.$whppt.saveNav(state.nav).then(nav => {
        commit('navLoaded', nav);
      });
    },
    loadNav({ commit }) {
      return this.$whppt.loadNav().then(nav => {
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
