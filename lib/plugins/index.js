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
      const pageType = plugin.pageType;
      const collection = pageType ? (pageType.collection && pageType.collection.name) || pageType.name : undefined;

      if (collection && !pageType.createPage) pageType.createPage = createPage(collection);
      if (collection && !pageType.deletePage) pageType.deletePage = deletePage(collection);
      if (collection && !pageType.loadPage) pageType.loadPage = loadPage(collection);
      if (collection && !pageType.savePage) pageType.savePage = savePage(collection);
      if (collection && !pageType.checkSlug) pageType.checkSlug = checkSlug(collection);
      if (collection && !pageType.applyRoles) pageType.applyRoles = applyRoles(collection);
      if (collection && !pageType.publishPage) {
        pageType.publishPage = publishPage(collection, pageType.beforePublish, pageType.afterPublish);
      }
      if (collection && !pageType.unpublishPage) {
        pageType.unpublishPage = unpublishPage(collection, pageType.beforeUnpublish, pageType.afterUnpublish);
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
  Image(whppt, store.state[`whppt/editor`].baseImageUrl, store.state[`whppt/editor`].baseCdnImageUrl);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

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
  directives.select(context, menuIsInState, MENUSTATES);
  directives.richText(context, menuIsInState, MENUSTATES);
  directives.actions(context, menuIsInState, MENUSTATES);
  directives.editorEnabled();
};

// type can be siteSettings, pageSettings, dashboard, editors.
function getAdditionalComponents(type) {
  const additionalTabs = [];
  const additionalComponents = {};

  const whpptPlugins = filter(global.$whppt.plugins, t => t[type]);

  for (const plugin of whpptPlugins) {
    const settings = Array.isArray(plugin[type]) ? plugin[type] : [plugin[type]];

    if (type === 'editors') {
      for (const editor of settings) {
        // key will be the identifier moving forwards into 2.0 release
        // editor.name is compatibility
        const key = editor.key || editor.name;

        if (key && editor.component) additionalComponents[key] = editor.component;
      }
    }

    for (const setting of settings) {
      // key will be the identifier moving forwards into 2.0 release
      // setting.name is compatibility
      const key = setting.key || setting.name;

      if (setting && key) {
        additionalComponents[key] = setting.component;
        additionalTabs.push({ name: key, label: setting.label });
      }
    }
  }

  return { additionalComponents, additionalTabs };
}
