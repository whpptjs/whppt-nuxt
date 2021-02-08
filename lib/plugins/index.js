// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import { filter } from 'lodash';
import { registerDynamicDirective, menuIsInState, MENUSTATES, setSpacings } from '../util';
import directives from './directives';
import { Components } from './Components';

import {
  checkSlug,
  createPage,
  deletePage,
  loadPage,
  publishPage,
  savePage,
  unpublishPage,
  applyRoles,
} from './pluginDefaults';

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
    context,
    plugins: {},
    apiPrefix: options.apiPrefix,
    savePageCallback: undefined,
    disablePublishing: options.disablePublishing,
    getAdditionalComponents,
    addPlugin(plugin) {
      const collection = plugin.pageType
        ? (plugin.pageType.collection && plugin.pageType.collection.name) || plugin.pageType.name
        : undefined;

      if (collection && !plugin.pageType.createPage) plugin.pageType.createPage = createPage(collection);
      if (collection && !plugin.pageType.deletePage) plugin.pageType.deletePage = deletePage(collection);
      if (collection && !plugin.pageType.loadPage) plugin.pageType.loadPage = loadPage(collection);
      if (collection && !plugin.pageType.savePage) plugin.pageType.savePage = savePage(collection);
      if (collection && !plugin.pageType.checkSlug) plugin.pageType.checkSlug = checkSlug(collection);
      if (collection && !plugin.pageType.applyRoles) plugin.pageType.applyRoles = applyRoles(collection);
      if (collection && !plugin.pageType.publishPage) {
        plugin.pageType.publishPage = publishPage(
          collection,
          plugin.pageType.beforePublish,
          plugin.pageType.afterPublish
        );
      }
      if (collection && !plugin.pageType.unpublishPage) {
        plugin.pageType.unpublishPage = unpublishPage(
          collection,
          plugin.pageType.beforeUnpublish,
          plugin.pageType.afterUnpublish
        );
      }

      this.plugins[plugin.name] = plugin;

      if (plugin.editors) {
        for (const editor of plugin.editors) {
          if (editor.directive) return editor.directive(context, menuIsInState, MENUSTATES, editor);
          registerDynamicDirective(context, menuIsInState, MENUSTATES, editor);
        }
      }
    },
  });

  const { store } = context;

  Object.assign(global.$whppt, {
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
    components: Components(options),
    spacing: setSpacings(options),
    defaultPadding: options.defaultPadding || {
      top: { base: 0, sm: 0, lg: 0 },
      bottom: { base: 0, sm: 0, lg: 0 },
    },
    defaultMargin: options.defaultMargin || {
      top: { base: 0, sm: 2, lg: 4 },
      bottom: { base: 0, sm: 2, lg: 4 },
    },
  });

  Select(whppt);
  Hover(whppt);
  Image(whppt, store.state[`whppt-nuxt/editor`].baseImageUrl, store.state[`whppt-nuxt/editor`].baseCdnImageUrl);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  /* @deprecated 2.0 */
  const $api = axios.create({
    baseURL: `${store.state['whppt-nuxt/editor'].baseAPIUrl}/${whppt.apiPrefix}`,
    timeout: 300000,
  });

  $api.$get = url => $api.get(url).then(res => res.data);
  $api.$post = (url, args) => $api.post(url, args).then(res => res.data);

  context.$api = $api;
  inject('api', $api);

  const dynamicDirectives = [
    { name: 'whppt-text', componentName: 'PlainText' },
    { name: 'whppt-anchor', componentName: 'Anchor' },
    { name: 'whppt-formatted-text', componentName: 'FormattedText' },
    { name: 'whppt-spacing', componentName: 'SpacingControls' },
  ];

  for (const directive of dynamicDirectives) {
    registerDynamicDirective(context, menuIsInState, MENUSTATES, directive);
  }

  directives.content(context, menuIsInState, MENUSTATES);
  directives.date(context, menuIsInState, MENUSTATES);
  directives.image(context, menuIsInState, MENUSTATES);
  directives.link(context, menuIsInState, MENUSTATES);
  directives.list(context, menuIsInState, MENUSTATES);
  directives.richText(context, menuIsInState, MENUSTATES);
  directives.editorEnabled();
};

// type can be siteSettings, pageSettings, dashboard, editors(?).
function getAdditionalComponents(type) {
  const additionalTabs = [];
  const additionalComponents = {};

  const pluginTypes = filter(global.$whppt.plugins, t => t[type]);

  // TODO: refactor below to be more readable
  for (const _type of pluginTypes) {
    if (type === 'editors') {
      for (const editor of _type[type]) {
        if (editor.name && editor.component) additionalComponents[editor.name] = editor.component;
      }
    }

    additionalComponents[_type[type].name] = _type[type].component;
    if (_type[type] && _type[type].name) additionalTabs.push(_type[type]);
  }

  return { additionalComponents, additionalTabs };
}
