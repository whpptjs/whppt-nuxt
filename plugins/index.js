import { Components } from './Components';
import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import carouselDirective from './directives/carousel';
import plainTextDirective from './directives/plainText';
import linkDirective from './directives/link';
import linkGroupDirective from './directives/linkGroup';
import listingsDirective from './directives/listings';
import containerDirective from './directives/container';

import SavePage from './helpers/SavePage';
import SaveFooter from './helpers/SaveFooter';
import LoadFooter from './helpers/LoadFooter';
import CreatePage from './helpers/CreatePage';
import LoadPage from './helpers/LoadPage';
import Select from './helpers/editors/Select';
import Hover from './helpers/editors/Hover';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const { store } = context;
  const whppt = {
    editData: undefined,
    createPage: CreatePage(context),
    savePage: SavePage(context),
    loadPage: LoadPage(context),
    loadFooter: LoadFooter(context),
    saveFooter: SaveFooter(context),
    templates: options.templates,
    baseAPIUrl: options.baseAPIUrl,
    components: Components(options),
    defaultMarginTop: options.defaultMarginTop,
  };

  const menuIsInState = type => {
    const editorState = store.state[`whppt-nuxt/editor`];
    return editorState.activeMenuItem === type;
  };

  const MENUSTATES = {
    SELECT: 'select',
    CONTENT: 'content',
  };

  Select(whppt);
  Hover(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective({ ...context, menuIsInState, MENUSTATES });
  plainTextDirective({ ...context, menuIsInState, MENUSTATES });
  carouselDirective({ ...context, menuIsInState, MENUSTATES });
  richTextDirective({ ...context, menuIsInState, MENUSTATES });
  linkDirective({ ...context, menuIsInState, MENUSTATES });
  linkGroupDirective({ ...context, menuIsInState, MENUSTATES });
  listingsDirective({ ...context, menuIsInState, MENUSTATES });
  containerDirective({ ...context, menuIsInState, MENUSTATES });
};
