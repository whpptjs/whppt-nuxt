export default context => ({ slug }) => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const baseAPIUrl = $whppt.baseAPIUrl || ``;

  return $axios
    .get(`${baseAPIUrl}/api/page/load?slug=${slug}`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      if (err.response.status === 404) $whppt.page = {};
      throw err;
    });
};
