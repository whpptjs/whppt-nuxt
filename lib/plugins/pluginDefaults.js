function createPage(collection) {
  return function({ $axios }, { page, form }) {
    const _page = { ...page, ...form };

    return $axios.$post(`api/obj/${collection}`, _page);
  };
}

function deletePage({ $axios }, { _id, collection }) {
  return $axios.$post(`/api/${collection}/deleteEvent`, { _id });
}

function loadPage(collection, { apiPrefix }) {
  return function({ $axios }, { slug }) {
    return $axios.$get(`${apiPrefix}/page/load?slug=${slug}&collection=${collection}`);
  };
}

function savePage({ $axios }, { page, collection }) {
  return $axios.$post(`/api/obj/${collection}/save`, { page });
}

function checkSlug({ $axios }, { slug, _id, collection }) {
  return $axios.$get(`/api/obj/${collection}/checkSlug?slug=${slug}&id=${_id}`);
}

function publishPage({ $axios }, { page, collection }) {
  return $axios.post(`/api/${collection}/publish`, { page });
}

function unpublishPage({ $axios }, { _id, collection }) {
  return $axios.$post(`/api/${collection}/unpublish`, { _id });
}

export { createPage, deletePage, loadPage, savePage, checkSlug, publishPage, unpublishPage };
