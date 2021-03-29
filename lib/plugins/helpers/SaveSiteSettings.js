export default context => ({ siteSettings }) => {
  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/${apiPrefix}/siteSettings/saveSiteSettings`, { siteSettings });
};
