export default options => ({
  namespaced: true,
  state: () => ({
    options,
    editing: false,
  }),
  actions: {
    savePage() {
      console.log('saving Page');
    },
  },
  mutations: {
    openEditor(state) {
      state.editing = !state.editing;
    },
  },
  getters: {},
});
