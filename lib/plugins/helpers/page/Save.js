import { find } from 'lodash';

export default context => page => {
  const { app } = context;

  page.pageType = page.pageType || 'page';

  const pageTypePlugin = find(app.$whppt.plugins, plugin => plugin.pageType && plugin.pageType.name === page.pageType);

  if (!pageTypePlugin || !pageTypePlugin.pageType) return;

  return pageTypePlugin.pageType.savePage(app.$whppt.context, { page }).then(savedPage => {
    return savedPage;
  });
};
