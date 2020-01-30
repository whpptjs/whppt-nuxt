import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import linkDirective from './directives/link';
import moveDirective from './directives/move';
import SavePage from './helpers/SavePage';
import LoadPage from './helpers/LoadPage';

export default (context, inject) => {
  const whppt = {
    editData: undefined,
    savePage: SavePage(context),
    loadPage: LoadPage(context),
  };

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective(context, whppt);
  richTextDirective(context, whppt);
  linkDirective(context, whppt);
  moveDirective(context, whppt);
};
