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
    editData: undefined,
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
    clearEditData({ commit }) {
      commit('editDataCleared');
      this.$whppt.clearEditData();
    },
    edit({ state, commit }, { el, value }) {
      commit('edited', value);
      this.$whppt.edit(el, state.editData);
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
      state.editInModalType = type;
    },
    sidebarClosed(state) {
      state.editSidebar = false;
      state.editSidebarType = undefined;
    },
    modalClosed(state) {
      state.editInModal = false;
      state.editInModalType = undefined;
    },
    editDataCleared(state) {
      state.editData = undefined;
    },
    edited(state, value) {
      state.editData = value;
    },
  },
  getters: {},
});
