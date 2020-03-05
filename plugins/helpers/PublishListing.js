export default context => listing => {
  const { $axios, store } = context;

  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  return $axios.post(`${baseAPIUrl}/api/listing/save`, { listing }).then(() => {
    return $axios.post(`${baseAPIUrl}/api/listing/publishListing`, { listing }).then(request => {
      return $axios
        .post(`${baseAPIUrl}/api/page/updateFromListing`, {
          _id: listing._id,
          slug: listing.slug,
          title: listing.name.value,
        })
        .then(result => {
          // return $axios.post(`${baseAPIUrl}/api/page/findById`, { id: listing._id }).then(page => {
          // return $axios.post(`${baseAPIUrl}/api/page/publishPage`, { page }).then(() => {
          //   return request.data;
          // });
        });
      // });
    });
  });
};
