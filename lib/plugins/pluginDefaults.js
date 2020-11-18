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

function publishPage(collection, beforePublish = () => Promise.resolve(), afterPublish = () => Promise.resolve()) {
  return function(context, { page }) {
    const { $axios, $whppt } = context;
    return beforePublish(context, { collection, id: page._id }).then(() => {
      return $axios.post(`${$whppt.apiPrefix}/page/publishPage`, { page, collection }).then(() => {
        return afterPublish(context, { collection, id: page._id });
      });
    });
  };
}

function unpublishPage(
  collection,
  beforeUnpublish = () => Promise.resolve(),
  afterUnpublish = () => Promise.resolve()
) {
  return function(context, { _id }) {
    const { $axios, $whppt } = context;
    return beforeUnpublish(context, _id).then(() => {
      return $axios.$post(`${$whppt.apiPrefix}/page/unpublishPage`, { _id, collection }).then(() => {
        return afterUnpublish(context, _id);
      });
    });
  };
}

function applyRoles(collection) {
  return function({ $whppt, $axios }, { page, roles }) {
    return $axios.$post(`${$whppt.apiPrefix}/roles/applyToPage`, { page, collection, roles });
  };
}

export { createPage, deletePage, loadPage, savePage, checkSlug, publishPage, unpublishPage, applyRoles };
