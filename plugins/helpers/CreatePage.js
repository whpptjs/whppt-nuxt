export default context => page => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  return $axios.post(`${$whppt.baseAPIUrl}/api/page/save`, { page });
};
