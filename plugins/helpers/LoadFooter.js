export default context => () => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const baseAPIUrl = $whppt.baseAPIUrl || ``;

  return $axios
    .get(`${baseAPIUrl}/api/footer/load`)
    .then(response => {
      $whppt.footer = response.data;
      console.log('$WHPPT.FOOTER', $whppt.footer);
      return response.data;
    })
    .catch(err => {
      if (err.response.status === 404) $whppt.footer = {};
      throw err;
    });
};
