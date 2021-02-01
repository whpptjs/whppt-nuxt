export default context => page => {
  const { $axios, store, app } = context;

  const apiPrefix = app.$whppt.apiPrefix;

  const baseAPIUrl = store.state['whppt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/${apiPrefix}/page/save`, { page }).then(() => {
    return $axios.post(`${baseAPIUrl}/${apiPrefix}/page/publishPage`, { page }).then(request => {
      if (page.template === 'listing') {
        return $axios.get(`${baseAPIUrl}/${apiPrefix}/listing/findById?id=${page._id}`).then(({ data }) => {
          const listing = data.listing;
          return $axios.post(`${baseAPIUrl}/${apiPrefix}/listing/publishListing`, { listing }).then(() => {
            return request.data;
          });
        });
      }
      return request.data;
    });
  });
};
