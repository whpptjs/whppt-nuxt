export default context => () => {
  const { $axios, store } = context;
  const { page } = store.state[`whppt-nuxt/page`];

  return $axios.post(`http://localhost:3001/api/page/save`, { page });
};
