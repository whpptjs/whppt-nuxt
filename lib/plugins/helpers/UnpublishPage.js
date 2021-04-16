/*
 * @deprecated: use plugin defaults instead
 */
export default context => _id => {
  // eslint-disable-next-line no-console
  console.warn(
    'lib/plugins/helpers/UnpublishPage.js is deprecated and will be removed in a future release, use the plugin defaults instead.'
  );

  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/${apiPrefix}/page/unpublishPage`, { _id });
};
