export default context => () => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const page = $whppt.page;
  const baseAPIUrl = $whppt.baseAPIUrl || '';

  return $axios.post(`${baseAPIUrl}/api/page/save`, { page });
};
