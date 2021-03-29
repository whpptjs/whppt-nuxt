import { find, cloneDeep } from 'lodash';
import Vue from 'vue';

function commitTimeout(f) {
  if (process.client) {
    setTimeout(() => {
      f();
    }, 100);
  } else {
    f();
  }
}

export default options => ({
  namespaced: true,
  state: () => ({
    options,
    page: undefined,
    savedPage: undefined,
  }),
  actions: {
    savePage({ commit, state }, page) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.savePage(this.$whppt.context, { page: _page }).then(savedPage => {
        commit('PAGE_LOADED', savedPage);

        this.$toast.global.editorSuccess('Page Saved');
      });
    },

    deletePage({ state }, { page } = {}) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.deletePage(this.$whppt.context, { _id: _page._id }).then(() => {
        this.$toast.global.editorSuccess('Page Deleted');
      });
    },

    publishPage({ commit, state }, { page } = {}) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.publishPage(this.$whppt.context, { page: _page }).then(publishedPage => {
        commit('PAGE_PUBLISHED', publishedPage);

        this.$toast.global.editorSuccess('Page Published');
      });
    },

    unpublishPage({ commit, state }, { page } = {}) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.unpublishPage(this.$whppt.context, { _id: _page._id }).then(() => {
        commit('PAGE_UNPUBLISHED');
        this.$toast.global.editorSuccess('Page Unpublished');
      });
    },

    loadPage({ commit, rootState }, { slug, pageType, collection }) {
      const pageTypePlugin = collection
        ? find(
            this.$whppt.plugins,
            plugin => plugin.pageType && plugin.pageType.collection && plugin.pageType.collection.name === collection
          )
        : find(this.$whppt.plugins, plugin => plugin.pageType && plugin.pageType.name === pageType);

      if (!pageTypePlugin || !pageTypePlugin.pageType) throw new Error('whppt:error Page not found.');

      const domainId = rootState['whppt/config'].domain && rootState['whppt/config'].domain._id;

      return pageTypePlugin.pageType.loadPage(this.$whppt.context, { slug, domainId }).then(page => {
        const template = find(pageTypePlugin.pageType.templates, template => template.key === page.template);

        if (template && template.init) template.init({ $set: Vue.set }, page);

        commitTimeout(() => commit('PAGE_LOADED', page));

        return page;
      });
    },

    checkSlug({ commit }, { slug, _id, pageType, collection, domainId }) {
      const pageTypePlugin = find(this.$whppt.plugins, plugin => plugin.pageType && plugin.pageType.name === pageType);

      return pageTypePlugin.pageType.checkSlug(this.$whppt.context, { slug, _id, collection, domainId });
    },

    applyRoles({ commit }, { page, roles }) {
      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === page.pageType
      );

      return pageTypePlugin.pageType.applyRoles(this.$whppt.context, { page, roles }).then(_page => {
        commit('PAGE_LOADED', _page);
      });
    },
  },
  mutations: {
    PAGE_UNPUBLISHED(state) {
      state.page.published = false;
    },

    PAGE_PUBLISHED(state, page) {
      state.page = { ...page, published: true };
    },

    PAGE_LOADED(state, page) {
      state.page = page;
      state.savedPage = cloneDeep(page);
    },

    PAGE_DELETED(state) {
      state.page = undefined;
    },
  },
});
