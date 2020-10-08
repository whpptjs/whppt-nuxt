export default options => ({
  namespaced: true,
  state: () => ({
    options,
    dashboardVisible: false,
  }),
  actions: {
    showDashboard({ commit }, newState) {
      commit('OPENED_DASHBOARD', newState);
    },
    closeDashboard({ commit }, newState) {
      commit('CLOSED_DASHBOARD', newState);
    },
  },
  mutations: {
    OPENED_DASHBOARD(state, newState = true) {
      state.dashboardVisible = newState;
    },
    CLOSED_DASHBOARD(state, newState = false) {
      state.dashboardVisible = newState;
    },
  },
  getters: {},
});
