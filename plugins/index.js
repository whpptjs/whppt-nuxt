import { Components } from './Components';
import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import carouselDirective from './directives/carousel';
import plainTextDirective from './directives/plainText';
import linkGroupDirective from './directives/linkGroup';
import linkDirective from './directives/link';
import listingsDirective from './directives/listings';
import listingDirective from './directives/listing';
import containerDirective from './directives/container';
import editImageDirective from './directives/editImage';
import SavePage from './helpers/SavePage';
import SaveFooter from './helpers/SaveFooter';
import LoadFooter from './helpers/LoadFooter';
import SaveNav from './helpers/SaveNav';
import LoadNav from './helpers/LoadNav';
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
    loadNav: LoadNav(context),
    saveNav: SaveNav(context),
    templates: options.templates,
    marginTop: options.marginTop,
    baseAPIUrl: options.baseAPIUrl,
    components: Components(options),
    defaultMarginTop: options.defaultMarginTop,
    spacing:
      options.spacing ||
      function(size) {
        switch (Number(size)) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 3:
            return 4;
          case 4:
            return 8;
          case 5:
            return 12;
          case 6:
            return 16;
          case 7:
            return 24;
          case 8:
            return 32;
          default:
            return 0;
        }
      },
  };

  const menuIsInState = type => {
    const editorState = store.state[`whppt-nuxt/editor`];
    return editorState.activeMenuItem === type;
  };

  const MENUSTATES = {
    SELECT: 'select',
    CONTENT: 'content',
    LISTING: 'listing',
  };

  Select(whppt);
  Hover(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective({ ...context, menuIsInState, MENUSTATES });
  plainTextDirective({ ...context, menuIsInState, MENUSTATES });
  carouselDirective({ ...context, menuIsInState, MENUSTATES });
  richTextDirective({ ...context, menuIsInState, MENUSTATES });
  linkGroupDirective({ ...context, menuIsInState, MENUSTATES });
  linkDirective({ ...context, menuIsInState, MENUSTATES });
  listingsDirective({ ...context, menuIsInState, MENUSTATES });
  listingDirective({ ...context, menuIsInState, MENUSTATES });
  containerDirective({ ...context, menuIsInState, MENUSTATES });
  editImageDirective({ ...context, menuIsInState, MENUSTATES });
};
