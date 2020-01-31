export default context => ({ slug }) => {
  const { $axios, store } = context;
  // const { $whppt, store } = context;

  return $axios.get(`http://localhost:3001/api/page/load?slug=${slug}`).then(page => {
    // return $whppt.loadPage(slug).then(page => {
    return store.commit('whppt-nuxt/page/loaded', page);
  });
};
