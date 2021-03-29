export default context => ({ slug, _id }) => {
  const { $axios, store, app } = context;
  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/${apiPrefix}/page/checkSlug?slug=${slug}&_id=${_id}`).then(response => {
    return response.data;
  });
};
