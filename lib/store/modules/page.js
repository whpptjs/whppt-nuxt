import { find } from 'lodash';
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
  }),
  actions: {
    publishPage({ commit, state }, { page } = {}) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.publishPage(this.$whppt.context, { page: _page }).then(() => {
        commit('pagePublished');
        this.$toast.global.editorSuccess('Page Published');
      });
    },
    savePage({ commit, state }, page) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.savePage(this.$whppt.context, { page: _page }).then(() => {
        commit('PAGE_LOADED', _page);

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
    unpublishPage({ commit, state }, { page } = {}) {
      const _page = page || state.page;
      _page.pageType = _page.pageType || 'page';

      const pageTypePlugin = find(
        this.$whppt.plugins,
        plugin => plugin.pageType && plugin.pageType.name === _page.pageType
      );

      if (!pageTypePlugin || !pageTypePlugin.pageType) return;

      return pageTypePlugin.pageType.unpublishPage(this.$whppt.context, { _id: _page._id }).then(() => {
        
        commit('pageUnPublished');
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
    checkSlug({ commit, rootState }, { slug, _id, pageType, collection, domainId }) {
      const pageTypePlugin = find(this.$whppt.plugins, plugin => plugin.pageType && plugin.pageType.name === pageType);

      return pageTypePlugin.pageType
        .checkSlug(this.$whppt.context, { slug, _id, collection, domainId })
        .then(slugExists => {
          return slugExists;
        });
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
    pageUnPublished {
     state.page.published = false;
    },
    pagePublished {
     state.page.published = true;
    },
   
    PAGE_LOADED(state, page) {
      state.page = page;
    },
    PAGE_DELETED(state) {
      state.page = undefined;
    },
  },
});
