export default options => ({
  namespaced: true,
  state: () => ({
    options,
  }),
  actions: {
    savePage() {
      console.log('saving Page');
    },
  },
  mutations: {},
  getters: {},
});
