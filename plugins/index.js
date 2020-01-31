import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import textBoxDirective from './directives/textBox';
import linkDirective from './directives/link';
import selectDirective from './directives/select';
import SavePage from './helpers/SavePage';
import LoadPage from './helpers/LoadPage';
import Select from './helpers/editors/Select';
import Edit from './helpers/editors/Edit';
import ClearContents from './helpers/editors/ClearContents';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const whppt = {
    editData: undefined,
    savePage: SavePage(context),
    loadPage: LoadPage(context),
    templates: options.templates,
    clearContents: ClearContents(context),
  };

  Select(whppt);
  Edit(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective(context, whppt);
  textBoxDirective(context, whppt);
  richTextDirective(context, whppt);
  linkDirective(context, whppt);
  selectDirective(context, whppt);
};
