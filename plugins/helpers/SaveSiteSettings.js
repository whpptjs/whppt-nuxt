export default context => ({ siteSettings, redirects, categories }) => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/siteSettings/saveSiteSettings`, { siteSettings }).then(settingsRequest => {
    // return $axios.post(`${baseAPIUrl}/api/siteSettings/saveRedirects`, { redirects }).then(redirectsRequest => {
    //   return $axios.post(`${baseAPIUrl}/api/siteSettings/saveCategories`, { categories }).then(categoriesRequest => {
    //     return {
    //       siteSettings: settingsRequest.data,
    //       redirects: redirectsRequest.data,
    //       categories: categoriesRequest.data,
    //     };
    //   });
    // });
  });
};
