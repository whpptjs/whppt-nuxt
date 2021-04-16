/*
 * @deprecated: use plugin defaults instead
 */
export default context => page => {
  // eslint-disable-next-line no-console
  console.warn(
    'lib/plugins/helpers/CreatePage.js is deprecated and will be removed in a future release, use the plugin defaults instead.'
  );
  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/${apiPrefix}/page/save`, { page }).then(request => {
    return request.data;
  });
};
