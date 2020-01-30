import richTextDirective from './directives/richText';
import linkDirective from './directives/link';
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

  richTextDirective(context, whppt);
  linkDirective(context, whppt);
};
