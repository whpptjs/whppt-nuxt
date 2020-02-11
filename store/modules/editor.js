export default options => ({
  namespaced: true,
  state: () => ({
    options,
    activeMenuItem: undefined,
    editSidebar: false,
    editInModal: false,
    editSidebarType: undefined,
    editInModalType: undefined,
    richTextWatcher: 0,
    selectedComponent: undefined,
    selectedContent: undefined,
  }),
  actions: {
    selectMenuItem({ commit }, type) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();
      commit('menuItemSelected', type);
    },
    closeSidebar({ commit }) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();
      // this.$whppt.clearSelectedContentsFormatting();
      // this.$whppt.clearEditingElementFormatting();
      commit('sidebarClosed');
    },
    closeModal({ commit }) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();
      // this.$whppt.clearSelectedContentsFormatting();
      // this.$whppt.clearEditingElementFormatting();
      commit('modalClosed');
    },
    clearSelectedComponent({ commit }) {
      commit('selectedComponentCleared');
      this.$whppt.clearSelectedComponent();
    },
    selectComponent({ state, commit }, { el, value }) {
      commit('componentSelected', value);
      this.$whppt.selectComponent(el);
    },
    selectContent({ state, commit }, { el, value }) {
      commit('contentSelected', value);
      this.$whppt.selectContent(el);
    },
    clearSelectedContent({ commit }) {
      commit('selectedContentCleared');
      this.$whppt.clearSelectedContent();
    },
    moveComponentUp({ state, commit }) {
      if (!state.selectedContent || !state.selectedComponent) return;
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i <= 0) return;
      this.$whppt.clearSelectedComponentFormatting();
      commit('movedComponentUp');
    },
    moveComponentDown({ state, commit }) {
      if (!state.selectedContent || !state.selectedComponent) return;
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (state.selectedContent.length === i + 1 || i < 0) return;
      this.$whppt.clearSelectedComponentFormatting();
      commit('movedComponentDown');
    },
  },
  mutations: {
    menuItemSelected(state, actionType) {
      state.editSidebar = false;
      if (state.activeMenuItem === actionType) {
        state.activeMenuItem = undefined;
        return;
      }
      state.activeMenuItem = actionType;
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
    selectedComponentCleared(state) {
      state.selectedComponent = undefined;
    },
    componentSelected(state, value) {
      state.selectedComponent = value;
    },
    contentSelected(state, value) {
      state.selectedContent = value;
    },
    selectedContentCleared(state, value) {
      state.selectedContent = undefined;
    },
    removedComponent(state) {
      if (!state.selectedContent || !state.selectedComponent) return;
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i < 0) return;
      state.selectedContent.splice(i, 1);
      state.selectedContent = undefined;
    },
    movedComponentDown(state) {
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (state.selectedContent.length === i + 1 || i < 0) return;
      const current = state.selectedContent[i];
      const prev = state.selectedContent[i + 1];

      state.selectedContent[i] = prev;
      state.selectedContent[i + 1] = current;
      state.selectedContent.__ob__.dep.notify();
    },
    movedComponentUp(state) {
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i <= 0) return;

      const current = state.selectedContent[i];
      const prev = state.selectedContent[i - 1];

      state.selectedContent[i] = prev;
      state.selectedContent[i - 1] = current;
      state.selectedContent.__ob__.dep.notify();
    },
  },
  getters: {},
});
