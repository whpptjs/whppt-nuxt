function createPage({ $axios }, { page, form, collection }) {
  // template not being set yet
  const _page = { ...page, ...form };

  return $axios.$post(`api/obj/${collection}`, _page);
}

function stripSlug({ slug }) {
  return slug.replace('event/', '');
}

function deletePage({ $axios }, { _id, collection }) {
  return $axios.$post(`/api/${collection}/deleteEvent`, { _id });
}

function loadPage({ $axios }, { slug, collection }) {
  return $axios.$get(`/api/${collection}/load?slug=${slug}`);
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

export { createPage, stripSlug, deletePage, loadPage, savePage, checkSlug, publishPage, unpublishPage };
