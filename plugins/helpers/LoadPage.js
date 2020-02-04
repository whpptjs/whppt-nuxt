export default context => ({ slug }) => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  return $axios
    .get(`${$whppt.baseAPIUrl}/api/page/load?slug=${slug}`)
    .then(response => {
      $whppt.page = response.data;
      return response.data;
    })
    .catch(err => {
      if (err.response.status === 404) $whppt.page = {};
      throw err;
    });
};
