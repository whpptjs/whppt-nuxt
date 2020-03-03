import { Components } from './Components';

import contentDirective from './directives/content';
import splitContentDirective from './directives/splitContent';
import richTextDirective from './directives/richText';
import blankDirective from './directives/blank';
import listDirective from './directives/list';
import plainTextDirective from './directives/plainText';
import linkGroupDirective from './directives/linkGroup';
import linkDirective from './directives/link';
import listingsDirective from './directives/listings';
import listingDirective from './directives/listing';
import editImageDirective from './directives/editImage';
import anchorDirective from './directives/anchor';
import contactIconDirective from './directives/contactIcon';

import SaveSiteSettings from './helpers/SaveSiteSettings';
import SavePage from './helpers/SavePage';
import PublishPage from './helpers/PublishPage';
import UnpublishPage from './helpers/UnpublishPage';
import DeletePage from './helpers/DeletePage';
import SaveFooter from './helpers/SaveFooter';
import PublishFooter from './helpers/PublishFooter';
import LoadFooter from './helpers/LoadFooter';
import SaveNav from './helpers/SaveNav';
import PublishNav from './helpers/PublishNav';
import LoadNav from './helpers/LoadNav';
import CreatePage from './helpers/CreatePage';
import LoadPage from './helpers/LoadPage';
import CheckSlug from './helpers/CheckSlug';
import Select from './helpers/editors/Select';
import Hover from './helpers/editors/Hover';
import Image from './helpers/Image';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const { store } = context;
  const whppt = {
    editData: undefined,
    saveSiteSettings: SaveSiteSettings(context),
    createPage: CreatePage(context),
    savePage: SavePage(context),
    publishPage: PublishPage(context),
    unpublishPage: UnpublishPage(context),
    deletePage: DeletePage(context),
    loadPage: LoadPage(context),
    checkSlug: CheckSlug(context),
    loadFooter: LoadFooter(context),
    saveFooter: SaveFooter(context),
    publishFooter: PublishFooter(context),
    loadNav: LoadNav(context),
    saveNav: SaveNav(context),
    publishNav: PublishNav(context),
    templates: options.templates,
    marginTop: options.marginTop,
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
  Image(whppt, store.state[`whppt-nuxt/editor`].baseImageUrl);
  Hover(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective({ ...context, menuIsInState, MENUSTATES });
  splitContentDirective({ ...context, menuIsInState, MENUSTATES });
  plainTextDirective({ ...context, menuIsInState, MENUSTATES });
  blankDirective({ ...context, menuIsInState, MENUSTATES });
  listDirective({ ...context, menuIsInState, MENUSTATES });
  richTextDirective({ ...context, menuIsInState, MENUSTATES });
  linkGroupDirective({ ...context, menuIsInState, MENUSTATES });
  linkDirective({ ...context, menuIsInState, MENUSTATES });
  listingsDirective({ ...context, menuIsInState, MENUSTATES });
  listingDirective({ ...context, menuIsInState, MENUSTATES });
  editImageDirective({ ...context, menuIsInState, MENUSTATES });
  anchorDirective({ ...context, menuIsInState, MENUSTATES });
  contactIconDirective({ ...context, menuIsInState, MENUSTATES });
};
