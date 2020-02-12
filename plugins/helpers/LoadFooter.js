export default context => () => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios
    .get(`${baseAPIUrl}/api/site/loadFooter`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log('ERR', err);
      throw err;
    });
};
