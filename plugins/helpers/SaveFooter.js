export default context => () => {
  const {
    $axios,
    app: { $whppt },
  } = context;

  const footer = $whppt.footer;
  const baseAPIUrl = $whppt.baseAPIUrl || '';

  return $axios.post(`${baseAPIUrl}/api/footer/save`, { footer });
};
