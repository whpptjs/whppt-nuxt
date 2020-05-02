export default {
  namespaced: true,
  state: () => ({}),
  getters: {
    inEditor(_, __, rootState) {
      return rootState['whppt-nuxt/editor'].activeMenuItem === 'select';
    },
  },
};
