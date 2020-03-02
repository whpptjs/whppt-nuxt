export default context => nav => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/site/publishNav`, { nav }).then(request => {
    return request.data;
  });
};
