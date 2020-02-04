export default context => ({ slug }) => {
  const { $axios, store } = context;
  // const { $whppt, store } = context;

  return $axios.get(`/api/page/load?slug=${slug}`).then(response => {
    // return $whppt.loadPage(slug).then(page => {
    return response.data;
  });
};
