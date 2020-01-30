export default options => ({
  namespaced: true,
  state: () => ({
    options,
    selector: undefined,
    editSidebar: false,
    editSidebarType: undefined,
    editTest: 0,
  }),
  actions: {},
  mutations: {
    setSelector(state, actionType) {
      state.editSidebar = false;
      if (state.selector === actionType) {
        state.selector = undefined;
        return;
      }
      state.selector = actionType;
    },
    editInSidebar(state, { type, data }) {
      state.editSidebar = true;
      state.editSidebarType = type;
      state.editTest = state.editTest + 1;
    },
    closeSidebar(state) {
      state.editSidebar = false;
      state.editSidebarType = undefined;
    },
  },
  getters: {},
});
