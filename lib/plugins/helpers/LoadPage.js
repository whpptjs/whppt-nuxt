/*
 * @deprecated: use plugin defaults instead
 */
export default context => ({ slug }) => {
  // eslint-disable-next-line no-console
  console.warn(
    'lib/plugins/helpers/LoadPage.js is deprecated and will be removed in a future release, use the plugin defaults instead.'
  );

  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.get(`${baseAPIUrl}/${apiPrefix}/page/load?slug=${slug}`).then(response => {
    return response.data;
  });
};
