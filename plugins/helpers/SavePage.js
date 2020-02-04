export default context => newPage => {
  const { $axios, store } = context;

  const { page } = store.state[`whppt-nuxt/page`];
  const pageToSave = newPage || page;

  return $axios.post(`/api/page/save`, { page: pageToSave });
};
