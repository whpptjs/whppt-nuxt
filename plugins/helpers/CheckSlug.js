export default context => ({ slug }) => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/api/page/checkSlug?slug=${slug}`).then(response => {
    return response.data;
  });
};
