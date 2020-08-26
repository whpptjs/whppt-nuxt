import { set } from 'lodash';

export default options => ({
  namespaced: true,
  state: () => {
    return {
      options,
      baseFileUrl: process.env.BASE_FILE_URL,
      baseAPIUrl: process.env.BASE_API_URL,
      baseImageUrl: process.env.BASE_IMAGE_URL,
      baseCdnImageUrl: process.env.BASE_CDN_IMAGE_URL,
      draft: process.env.DRAFT === 'true' || process.env.DRAFT === true,
      environment: process.env.NODE_ENV,
      activeMenuItem: undefined,
      editSidebar: false,
      editInModal: false,
      editSidebarType: undefined,
      editInModalType: undefined,
      richTextWatcher: 0,
      formattedTextWatcher: 0,
      selectedComponent: undefined,
      selectedContent: undefined,
      selectedContentWhitelist: undefined,
      selectedContentBlacklist: undefined,
    };
  },
  actions: {
    selectMenuItem({ commit }, type) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();
      commit('menuItemSelected', type);
    },
    closeSidebar({ commit }) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();
      commit('sidebarClosed');
    },
    closeModal({ commit }) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();
      commit('modalClosed');
    },
    clearSelectedComponent({ commit }) {
      commit('selectedComponentCleared');
      this.$whppt.clearSelectedComponent();
    },
    // Child
    selectComponent({ state, commit }, { el, value }) {
      commit('componentSelected', value);
      this.$whppt.selectComponent(el);
    },
    // Parent
    selectContent({ state, commit }, { el, value, whitelist, blacklist }) {
      commit('contentSelected', { value, whitelist, blacklist });
      this.$whppt.selectContent(el);
    },
    clearSelectedContent({ commit }) {
      commit('selectedContentCleared');
      this.$whppt.clearSelectedContent();
    },
    removeComponent({ state, commit }) {
      if (!state.selectedContent || !state.selectedComponent) return;
      this.$whppt.clearSelectedComponentFormatting();
      commit('removedComponent');
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
    setSelectedComponentState({ state, commit }, { value, path }) {
      commit('selectedComponentValueChanged', { value, path });
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
      state.formattedTextWatcher = state.formattedTextWatcher + 1;
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
    contentSelected(state, { value, whitelist, blacklist }) {
      state.selectedContent = value;
      state.selectedContentWhitelist = whitelist;
      state.selectedContentBlacklist = blacklist;
    },
    selectedContentCleared(state, value) {
      state.selectedContent = undefined;
      state.selectedContentFilter = undefined;
    },
    removedComponent(state) {
      if (!state.selectedContent || !state.selectedComponent) return;
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i < 0) return;
      state.editSidebar = false;
      state.editSidebarType = undefined;
      state.selectedComponent = undefined;
      state.selectedContent = state.selectedContent.splice(i, 1);
    },
    movedComponentDown(state) {
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (state.selectedContent.length === i + 1 || i < 0) return;

      const current = state.selectedContent[i];

      state.selectedContent[i] = state.selectedContent[i + 1];
      state.selectedContent[i + 1] = current;
      state.selectedContent.__ob__.dep.notify();
    },
    movedComponentUp(state) {
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i <= 0) return;

      const current = state.selectedContent[i];

      state.selectedContent[i] = state.selectedContent[i - 1];
      state.selectedContent[i - 1] = current;
      state.selectedContent.__ob__.dep.notify();
    },
    selectedComponentValueChanged(state, { path, value }) {
      const newValue = path ? set({ ...state.selectedComponent.value }, path, value) : value;

      console.log('updating selected component', newValue);

      state.selectedComponent.value = newValue;
    },
  },
  getters: {},
});
