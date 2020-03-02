export default context => ({ siteSettings, redirects, categories }) => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/siteSettings/saveSiteSettings`, { siteSettings }).then(request => {
    return request.data;
  });
};
