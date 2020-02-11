export default context => footer => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const baseAPIUrl = $whppt.baseAPIUrl || '';

  return $axios.post(`${baseAPIUrl}/api/site/saveFooter`, { footer }).then(request => {
    return request.data;
  });
};
