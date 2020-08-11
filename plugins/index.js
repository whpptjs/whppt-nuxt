import axios from 'axios';
import { forEach } from 'lodash';
import GenericPage from '../components/lib/systemPlugins/GenericPagePlugin';
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
import editImageDirective from './directives/editImage';
import editImage2Directive from './directives/editImage2';
import anchorDirective from './directives/anchor';
import contactIconDirective from './directives/contactIcon';
import dynamicDirective from './directives/dynamic';
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
import LoadPage from './helpers/LoadPage';
import CheckSlug from './helpers/CheckSlug';
import Select from './helpers/editors/Select';
import Hover from './helpers/editors/Hover';
import Image from './helpers/Image';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const whppt = (global.$whppt = {
    availablePlugins: { GenericPage },
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
      forEach(plugins, (plugin, key) => {
        this.plugins[key] = plugin;

        if (plugin.editors) {
          forEach(plugin.editors, editor => {
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
        }
      });
    },
  });
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

  const $api = axios.create({
    baseURL: `${store.state['whppt-nuxt/editor'].baseAPIUrl}/${whppt.apiPrefix}`,
    timeout: 6000,
  });

  $api.$get = url => $api.get(url).then(res => res.data);
  $api.$post = (url, args) => $api.post(url, args).then(res => res.data);

  context.$api = $api;
  inject('api', $api);

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
  editImageDirective({ ...context, menuIsInState, MENUSTATES });
  editImage2Directive({ ...context, menuIsInState, MENUSTATES });
  anchorDirective({ ...context, menuIsInState, MENUSTATES });
  contactIconDirective({ ...context, menuIsInState, MENUSTATES });
  youtubeDirective({ ...context, menuIsInState, MENUSTATES });
  dateDirective({ ...context, menuIsInState, MENUSTATES });
};
