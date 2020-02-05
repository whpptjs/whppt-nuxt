export default options => ({
  namespaced: true,
  state: () => ({
    options,
    selector: undefined,
    editSidebar: false,
    editInModal: false,
    editSidebarType: undefined,
    editInModalType: undefined,
    richTextWatcher: 0,
  }),
  actions: {
    selectComponent({ commit }, type) {
      this.$whppt.clearSelected();
      this.$whppt.clearSelectedContentsFormatting();
      this.$whppt.clearEditingElementFormatting();
      commit('componentSelected', type);
    },
    closeSidebar({ commit }) {
      this.$whppt.clearSelected();
      this.$whppt.clearSelectedContentsFormatting();
      this.$whppt.clearEditingElementFormatting();
      commit('sidebarClosed');
    },
    closeModal({ commit }) {
      this.$whppt.clearSelected();
      this.$whppt.clearSelectedContentsFormatting();
      this.$whppt.clearEditingElementFormatting();
      commit('modalClosed');
    },
  },
  mutations: {
    componentSelected(state, actionType) {
      state.editSidebar = false;
      if (state.selector === actionType) {
        state.selector = undefined;
        return;
      }
      state.selector = actionType;
    },
    editInSidebar(state, type) {
      state.editSidebar = true;
      state.editSidebarType = type;
      state.richTextWatcher = state.richTextWatcher + 1;
    },
    editInModal(state, type) {
      state.editInModal = true;
      state.editInModalTypeType = type;
    },
    sidebarClosed(state) {
      state.editSidebar = false;
      state.editSidebarType = undefined;
    },
    modalClosed(state) {
      state.editInModal = false;
      state.editInModalTypeType = undefined;
    },
  },
  getters: {},
});
