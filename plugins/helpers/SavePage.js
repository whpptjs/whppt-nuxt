export default context => page => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const baseAPIUrl = $whppt.baseAPIUrl || '';

  return $axios.post(`${baseAPIUrl}/api/page/save`, { page });
};
