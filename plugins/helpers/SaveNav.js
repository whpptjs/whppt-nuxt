export default context => nav => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const baseAPIUrl = $whppt.baseAPIUrl || '';

  return $axios.post(`${baseAPIUrl}/api/site/saveNav`, { nav }).then(request => {
    return request.data;
  });
};
