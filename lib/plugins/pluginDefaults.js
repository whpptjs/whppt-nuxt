function createPage(collection) {
  return function({ $axios, $whppt }, { page, form }) {
    const _page = { ...form, ...page };

    return $axios.$post(`${$whppt.apiPrefix}/page/save`, { page: _page, collection });
  };
}

function deletePage(collection) {
  return function({ $axios }, { _id }) {
    return $axios.$post(`/api/page/delete`, { _id, collection });
  };
}

function loadPage(collection) {
  return function({ $axios, $whppt }, { slug }) {
    return $axios.$get(`${$whppt.apiPrefix}/page/load?slug=${slug}&collection=${collection}`);
  };
}
function savePage(collection) {
  return function savePage({ $axios, $whppt }, { page }) {
    return $axios.$post(`${$whppt.apiPrefix}/page/save`, { page, collection });
  };
}

function checkSlug(collection) {
  return function({ $axios, $whppt }, { slug, _id }) {
    return $axios.$get(`${$whppt.apiPrefix}/page/checkSlug?slug=${slug}&id=${_id}&collection=${collection}`);
  };
}

function publishPage() {
  return function({ $axios }, { page, collection }) {
    return $axios.post(`/api/${collection}/publish`, { page });
  };
}

function unpublishPage() {
  return function({ $axios }, { _id, collection }) {
    return $axios.$post(`/api/${collection}/unpublish`, { _id });
  };
}

export { createPage, deletePage, loadPage, savePage, checkSlug, publishPage, unpublishPage };
