import { assign } from 'lodash';

import GenericPage from './GenericPage';

const formatSlug = ({ slug }) => {
  return `other/${slug}`;
};

const stripSlug = ({ slug }) => {
  return slug.replace('other/', '');
};

const createPage = ({ $axios }, { page, form }) => {
  assign(page, form.template.init);
  page.template = form.template.key;
  return $axios.$post(`/page/save`, { page });
};

const deletePage = ({ $axios }, { _id }) => {
  return $axios.$post(`/page/delete`, { _id });
};

const loadPage = ({ $axios }, { slug }) => {
  return $axios.$get(`/page/load?slug=${slug}`);
};

const savePage = ({ $axios }, { page }) => {
  return $axios.$post(`/page/save`, { page });
};

const publishPage = ({ $axios }, { page }) => {
  return $axios.$post(`/page/publishPage`, { page });
};

const unpublishPage = ({ $axios }, { _id }) => {
  return $axios.$post(`/page/unpublishPage`, { _id });
};

export default ({ templates }) => ({
  pageType: {
    name: 'otherPage',
    label: 'Other Page',
    formatSlug,
    stripSlug,
    templates,
    component: GenericPage,
    createPage,
    savePage,
    loadPage,
    publishPage,
    deletePage,
    unpublishPage,
  },
});
