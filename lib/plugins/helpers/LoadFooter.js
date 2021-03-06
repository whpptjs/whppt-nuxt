export default context => ({ domainId }) => {
  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/${apiPrefix}/site/loadFooter?domainId=${domainId}`).then(response => {
    return response.data;
  });
};
