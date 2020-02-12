export default context => ({ slug }) => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios
    .get(`${baseAPIUrl}/api/page/load?slug=${slug}`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      if (err.response.status === 404) $whppt.page = {};
      throw err;
    });
};
