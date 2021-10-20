import Vue from 'vue';
import { find } from 'lodash';

export default context => ({ slug, pageType }) => {
  const { store, app } = context;

  const pageTypePlugin = find(app.$whppt.plugins, plugin => plugin.pageType && plugin.pageType.name === pageType);

  if (!pageTypePlugin || !pageTypePlugin.pageType) throw new Error('whppt:error Page not found.');

  const domainId = store.state['whppt/config'].domain && store.state['whppt/config'].domain._id;

  return pageTypePlugin.pageType.loadPage(app.$whppt.context, { slug, domainId }).then(page => {
    const template = find(pageTypePlugin.pageType.templates, template => template.key === page.template);

    if (template && template.init) template.init({ $set: Vue.set }, page);

    return page;
  });
};
