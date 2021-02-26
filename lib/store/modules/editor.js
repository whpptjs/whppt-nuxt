import { get } from 'lodash';
import { vueSet } from 'vue-deepset';

export default options => ({
  namespaced: true,
  state: () => ({
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
    dashboardVisible: false,
    editSidebarType: undefined,
    editInModalType: undefined,
    richTextWatcher: 0,
    formattedTextWatcher: 0,
    selectedComponent: undefined,
    selectedContent: undefined,
    componentPreviewType: '',
  }),
  actions: {
    selectMenuItem({ commit }, type) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();

      commit('MENU_ITEM_SELECTED', type);
    },
    closeSidebar({ commit }) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();

      commit('SIDEBAR_CLOSED');
    },
    closeModal({ commit }) {
      this.$whppt.clearSelectedComponent();
      this.$whppt.clearSelectedContent();

      commit('MODAL_CLOSED');
    },
    clearSelectedComponent({ commit }) {
      this.$whppt.clearSelectedComponent();

      commit('SELECTED_COMPONENT_CLEARED');
    },

    selectContent({ state, commit }, { el, value, whitelist, blacklist }) {
      // Parent
      this.$whppt.selectContent(el);

      commit('CONTENT_SELECTED', { value, whitelist, blacklist });
    },
    selectComponent({ state, commit }, { el, value }) {
      console.log('🚀 ~ file: editor.js ~ line 58 ~ selectComponent ~ value', value);
      // Child
      this.$whppt.selectComponent(el);

      commit('COMPONENT_SELECTED', value);
    },
    clearSelectedContent({ commit }) {
      this.$whppt.clearSelectedContent();

      commit('SELECTED_CONTENT_CLEARED');
    },
    removeComponent({ state, commit }) {
      if (!state.selectedContent || !state.selectedComponent) return;
      this.$whppt.clearSelectedComponentFormatting();
      commit('REMOVED_COMPONENT');
    },
    moveComponentUp({ state, commit }) {
      if (!state.selectedContent || !state.selectedComponent) return;
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i <= 0) return;
      this.$whppt.clearSelectedComponentFormatting();
      commit('MOVED_COMPONENT_UP');
    },
    moveComponentDown({ state, commit }) {
      if (!state.selectedContent || !state.selectedComponent) return;

      const i = state.selectedContent.indexOf(state.selectedComponent.value);

      if (state.selectedContent.length === i + 1 || i < 0) return;

      this.$whppt.clearSelectedComponentFormatting();

      commit('MOVED_COMPONENT_DOWN');
    },
    setSelectedComponentState({ state, commit }, { value, path }) {
      commit('SELECTED_COMPONENT_VALUE_CHANGED', { value, path });
    },
    pushSelectedComponentState({ state, commit }, { value, path }) {
      commit('PUSHED_SELECTED_COMPONENT_VALUE', { value, path });
    },
    changeComponentPreviewType({ commit }, componentType) {
      commit('COMPONENT_PREVIEW_TYPE_CHANGED', componentType);
    },
  },
  mutations: {
    MENU_ITEM_SELECTED(state, actionType) {
      state.editSidebar = false;
      if (state.activeMenuItem === actionType) {
        state.activeMenuItem = undefined;

        return;
      }
      state.activeMenuItem = actionType;
    },
    SIDEBAR_CLOSED(state) {
      state.editSidebar = false;
      state.editSidebarType = undefined;
    },
    MODAL_CLOSED(state) {
      state.editInModal = false;
      state.editInModalType = undefined;
    },
    SELECTED_COMPONENT_CLEARED(state) {
      state.selectedComponent = undefined;
    },
    COMPONENT_SELECTED(state, value) {
      state.selectedComponent = value;
    },
    CONTENT_SELECTED(state, { value, whitelist, blacklist }) {
      state.selectedContent = value;
      state.selectedContentWhitelist = whitelist;
      state.selectedContentBlacklist = blacklist;
    },
    SELECTED_CONTENT_CLEARED(state, value) {
      state.selectedContent = undefined;
      state.selectedContentFilter = undefined;
    },
    REMOVED_COMPONENT(state) {
      const componentIndex = state.selectedContent.indexOf(state.selectedComponent.value);
      if (componentIndex < 0) return;

      state.editSidebar = false;
      state.editSidebarType = undefined;
      state.selectedComponent = undefined;
      state.selectedContent = state.selectedContent.splice(componentIndex, 1);
    },
    MOVED_COMPONENT_DOWN(state) {
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (state.selectedContent.length === i + 1 || i < 0) return;

      const current = state.selectedContent[i];

      state.selectedContent[i] = state.selectedContent[i + 1];
      state.selectedContent[i + 1] = current;
      state.selectedContent.__ob__.dep.notify();
    },
    MOVED_COMPONENT_UP(state) {
      const i = state.selectedContent.indexOf(state.selectedComponent.value);
      if (i <= 0) return;

      const current = state.selectedContent[i];

      state.selectedContent[i] = state.selectedContent[i - 1];
      state.selectedContent[i - 1] = current;
      state.selectedContent.__ob__.dep.notify();
    },
    SELECTED_COMPONENT_VALUE_CHANGED(state, { path, value }) {
      path ? vueSet(state.selectedComponent.value, path, value) : vueSet(state.selectedComponent, 'value', value);
    },
    PUSHED_SELECTED_COMPONENT_VALUE(state, { path, value }) {
      const currentValue = path ? get(state.selectedComponent.value, path) : state.selectedComponent.value;

      if (!Array.isArray(currentValue))
        throw new Error('Value provided is not an array, please provide an Array or use the setSelected');

      currentValue.push(value);
    },
    COMPONENT_PREVIEW_TYPE_CHANGED(state, componentType) {
      state.componentPreviewType = componentType;
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
  },
  getters: {},
});
