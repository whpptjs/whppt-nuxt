export default context => ({ slug }) => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  return $axios.get(`${$whppt.baseAPIUrl}/api/page/load?slug=${slug}`).then(response => {
    return response.data;
  });
};
