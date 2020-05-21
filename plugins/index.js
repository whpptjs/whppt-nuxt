import { filter, flatMap, forEach } from 'lodash';
import { Components } from './Components';

import contentDirective from './directives/content';
import coloursDirective from './directives/colours';
import splitContentDirective from './directives/splitContent';
import splitGapDirective from './directives/splitGap';
import richTextDirective from './directives/richText';
import formattedTextDirective from './directives/formattedText';
import defaultDirective from './directives/default';
import listDirective from './directives/list';
import plainTextDirective from './directives/plainText';
import menuDirective from './directives/menu';
import linkDirective from './directives/link';
// import listingsDirective from './directives/listings';
// import listingDirective from './directives/listing';
import editImageDirective from './directives/editImage';
import editImage2Directive from './directives/editImage2';
import anchorDirective from './directives/anchor';
import contactIconDirective from './directives/contactIcon';
import dynamicDirective from './directives/dynamic';
// import _videoBlockDirective from './directives/_videoBlock';
import youtubeDirective from './directives/youtube';
import dateDirective from './directives/date';

import LoadSiteSettings from './helpers/LoadSiteSettings';
import SaveSiteSettings from './helpers/SaveSiteSettings';
import PublishSiteSettings from './helpers/PublishSiteSettings';
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
// import CreatePage from './helpers/CreatePage';
import LoadPage from './helpers/LoadPage';
// import LoadListing from './helpers/LoadListing';
import CheckSlug from './helpers/CheckSlug';
import Select from './helpers/editors/Select';
import Hover from './helpers/editors/Hover';
import Image from './helpers/Image';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const whppt = (global.$whppt = {
    context,
    plugins: {},
    types: options.types,
    savePageCallback: undefined,
    onSavePage(callback) {
      this.savePageCallback = callback;
    },
    offSavePage() {
      this.savePageCallback = undefined;
    },
    apiPrefix: options.apiPrefix,
    disablePublishing: options.disablePublishing,
    addPlugins(plugins) {
      forEach(plugins, (p, k) => (this.plugins[k] = p));
    },
  });
  // global.richTextNavigate = function(to) {
  //   console.log('global.richTextNavigate -> to', to);
  //   context.app.router.push(to)
  //   return false;
  // };
  const setSize = function(size) {
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
  };

  const { store } = context;

  Object.assign(global.$whppt, {
    editData: undefined,
    loadSiteSettings: LoadSiteSettings(context),
    saveSiteSettings: SaveSiteSettings(context),
    publishSiteSettings: PublishSiteSettings(context),
    // createPage: CreatePage(context),
    savePage: SavePage(context),
    publishPage: PublishPage(context),
    unpublishPage: UnpublishPage(context),
    deletePage: DeletePage(context),
    loadPage: LoadPage(context),
    // loadListing: LoadListing(context),
    checkSlug: CheckSlug(context),
    loadFooter: LoadFooter(context),
    saveFooter: SaveFooter(context),
    publishFooter: PublishFooter(context),
    loadNav: LoadNav(context),
    saveNav: SaveNav(context),
    publishNav: PublishNav(context),
    templates: options.templates,
    pageTypes: options.pageTypes,
    components: Components(options),
    defaultPadding: {
      top: (options.defaultPadding && options.defaultPadding.top) || { base: 0, sm: 0, lg: 0 },
      bottom: (options.defaultPadding && options.defaultPadding.bottom) || { base: 0, sm: 0, lg: 0 },
    },
    defaultMargin: {
      top: (options.defaultMargin && options.defaultMargin.top) || { base: 0, sm: 2, lg: 4 },
      bottom: (options.defaultMargin && options.defaultMargin.bottom) || { base: 0, sm: 2, lg: 4 },
    },
    spacing: options.spacing || setSize,
  });

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
  Image(
    whppt,
    store.state[`whppt-nuxt/editor`].baseImageUrl,
    store.state[`whppt-nuxt/editor`].baseCdnImageUrl,
    store.state[`whppt-nuxt/editor`].baseImageUrl2,
    store.state[`whppt-nuxt/editor`].baseCdnImageUrl2
  );
  Hover(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective({ ...context, menuIsInState, MENUSTATES });
  coloursDirective({ ...context, menuIsInState, MENUSTATES });
  splitContentDirective({ ...context, menuIsInState, MENUSTATES });
  splitGapDirective({ ...context, menuIsInState, MENUSTATES });
  plainTextDirective({ ...context, menuIsInState, MENUSTATES });
  defaultDirective({ ...context, menuIsInState, MENUSTATES });
  listDirective({ ...context, menuIsInState, MENUSTATES });
  richTextDirective({ ...context, menuIsInState, MENUSTATES });
  formattedTextDirective({ ...context, menuIsInState, MENUSTATES });
  menuDirective({ ...context, menuIsInState, MENUSTATES });
  linkDirective({ ...context, menuIsInState, MENUSTATES });
  // listingsDirective({ ...context, menuIsInState, MENUSTATES });
  // listingDirective({ ...context, menuIsInState, MENUSTATES });
  editImageDirective({ ...context, menuIsInState, MENUSTATES });
  editImage2Directive({ ...context, menuIsInState, MENUSTATES });
  anchorDirective({ ...context, menuIsInState, MENUSTATES });
  contactIconDirective({ ...context, menuIsInState, MENUSTATES });
  // _videoBlockDirective({ ...context, menuIsInState, MENUSTATES });
  youtubeDirective({ ...context, menuIsInState, MENUSTATES });
  dateDirective({ ...context, menuIsInState, MENUSTATES });

  const types = global.$whppt.plugins;
  const editors = flatMap(
    filter(types, t => t.editors),
    t => t.editors
  );

  forEach(editors, editor => {
    if (editor.directive)
      return editor.directive({
        ...context,
        menuIsInState,
        MENUSTATES,
        definition: editor,
      });

    dynamicDirective({
      ...context,
      menuIsInState,
      MENUSTATES,
      definition: editor,
    });
  });
};
