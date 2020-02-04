export default context => ({ slug }) => {
  const { $axios, app } = context;
  // console.log(app);
  // return Promise.resolve();
  return $axios.get(`/api/page/load?slug=${slug}`).then(response => {
    return response.data;
  });
};
