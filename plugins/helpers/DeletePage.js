export default context => _id => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/page/delete`, { _id }).then(request => {
    return request.data;
  });
};
