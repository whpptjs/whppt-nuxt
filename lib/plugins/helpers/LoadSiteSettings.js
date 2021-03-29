export default context => ({ domainId }) => {
  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/${apiPrefix}/siteSettings/loadSiteSettings?domainId=${domainId}`).then(response => {
    return response.data;
  });
};
