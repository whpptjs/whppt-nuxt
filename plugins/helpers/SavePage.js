export default context => newPage => {
  const {
    $axios,
    store,
    app: { $whppt },
  } = context;

  const { page } = store.state[`whppt-nuxt/page`];
  const pageToSave = newPage || page;

  return $axios.post(`${$whppt.baseAPIUrl}/api/page/save`, { page: pageToSave });
};
