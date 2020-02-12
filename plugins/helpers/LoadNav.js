export default context => () => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const baseAPIUrl = $whppt.baseAPIUrl || ``;

  return $axios
    .get(`${baseAPIUrl}/api/site/loadNav`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log('ERR', err);

      throw err;
    });
};
