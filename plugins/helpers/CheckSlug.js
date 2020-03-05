export default context => ({ slug, _id }) => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/api/page/checkSlug?slug=${slug}&_id=${_id}`).then(response => {
    return response.data;
  });
};
