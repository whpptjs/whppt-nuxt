import { find, cloneDeep } from 'lodash';

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
    setPageValue({ commit }, { property, value }) {
      commit('PAGE_VALUE_CHANGED', { property, value });
    },
    savePage({ commit, state }, page) {
      return this.$whppt.page.save(page || state.page).then(savedPage => {
        if (!savedPage) return;

        commit('PAGE_SAVED', savedPage);

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
        _page.lastPublished = publishedPage.lastPublished || _page.lastPublished;
        _page.published = publishedPage.published || _page.published;
        _page.updatedAt = publishedPage.updatedAt || _page.updatedAt;

        commit('PAGE_PUBLISHED', _page);

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

    loadPage({ commit }, { slug, pageType }) {
      return this.$whppt.page.load({ slug, pageType }).then(page => {
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
    PAGE_VALUE_CHANGED(state, { property, value }) {
      state.page[property] = value;
    },
    PAGE_UNPUBLISHED(state) {
      state.page.published = false;
    },

    PAGE_PUBLISHED(state, page) {
      state.page = { ...page, published: true };
    },

    PAGE_SAVED(state, pageInfo) {
      state.page._id = pageInfo._id;
      state.page.updatedAt = pageInfo.updatedAt;
      state.savedPage = cloneDeep(state.page);
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
