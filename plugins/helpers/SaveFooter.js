export default context => footer => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/site/saveFooter`, { footer }).then(request => {
    return request.data;
  });
};
