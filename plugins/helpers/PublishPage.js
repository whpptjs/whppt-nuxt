export default context => page => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/page/save`, { page }).then(() => {
    return $axios.post(`${baseAPIUrl}/api/page/publishPage`, { page }).then(request => {
      if (page.template === 'listing') {
        return $axios.post(`${baseAPIUrl}/api/listing/findById`, { id: page._id }).then(({ data }) => {
          const listing = data.listing;
          return $axios.post(`${baseAPIUrl}/api/listing/publishListing`, { listing }).then(() => {
            return request.data;
          });
        });
      }
      return request.data;
    });
  });
};
