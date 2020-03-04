export default context => page => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/page/publishPage`, { page }).then(request => {
    return request.data;
  });
};
