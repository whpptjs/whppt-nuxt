export default (context, params) => {
  const { $axios } = context;

  return $axios.post(`http://localhost:3001/api/page/save`, params);
};
