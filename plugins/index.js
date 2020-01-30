import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import linkDirective from './directives/link';
import moveDirective from './directives/move';
import SavePage from './helpers/SavePage';
import LoadPage from './helpers/LoadPage';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const whppt = {
    editData: undefined,
    savePage: SavePage(context),
    loadPage: LoadPage(context),
    templates: options.templates,
  };

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective(context, whppt);
  richTextDirective(context, whppt);
  linkDirective(context, whppt);
  moveDirective(context, whppt);
};
