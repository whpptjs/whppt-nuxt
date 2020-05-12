export default context => () => {
  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/${apiPrefix}/site/loadNav`).then(response => {
    return response.data;
  });
};
