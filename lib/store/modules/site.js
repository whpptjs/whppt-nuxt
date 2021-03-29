import Vue from 'vue';

export default options => ({
  namespaced: true,
  state: () => ({
    options,
    footer: undefined,
    nav: undefined,
    siteSettings: undefined,
  }),
  actions: {
    saveFooter({ state, commit, rootState }) {
      const domainId = rootState['whppt/config'].domain && rootState['whppt/config'].domain._id;

      return this.$whppt.saveFooter({ ...state.footer, domainId }).then(footer => {
        this.$toast.global.editorSuccess('Footer Saved');
        commit('FOOTER_LOADED', footer);
      });
    },

    publishFooter({ state }) {
      return this.$whppt.publishFooter(state.footer).then(() => {
        this.$toast.global.editorSuccess('Footer Published');
      });
    },

    loadFooter({ commit, rootState }, { domain } = {}) {
      const currentDomain = domain || rootState['whppt/config'].domain;

      const domainId = currentDomain && currentDomain._id;

      return this.$whppt.loadFooter({ domainId }).then(footer => {
        if (this.$whppt.initFooter) this.$whppt.initFooter({ $set: Vue.set }, footer);

        commit('FOOTER_LOADED', footer);
      });
    },

    saveNav({ state, commit, rootState }) {
      const domainId = rootState['whppt/config'].domain && rootState['whppt/config'].domain._id;

      return this.$whppt.saveNav({ ...state.nav, domainId }).then(nav => {
        this.$toast.global.editorSuccess('Nav Saved');
        commit('NAV_LOADED', nav);
      });
    },

    publishNav({ state }) {
      return this.$whppt.publishNav(state.nav).then(() => {
        this.$toast.global.editorSuccess('Nav Published');
      });
    },

    loadNav({ commit, rootState }, { domain } = {}) {
      const currentDomain = domain || rootState['whppt/config'].domain;

      const domainId = currentDomain && currentDomain._id;

      return this.$whppt.loadNav({ domainId }).then(nav => {
        if (this.$whppt.initNav) this.$whppt.initNav({ $set: Vue.set }, nav);
        commit('NAV_LOADED', nav);
      });
    },

    loadSiteSettings({ commit, rootState }, { domain } = {}) {
      const currentDomain = domain || rootState['whppt/config'].domain;

      const domainId = currentDomain && currentDomain._id;

      return this.$whppt.loadSiteSettings({ domainId }).then(siteSettings => {
        siteSettings = siteSettings || { _id: 'siteSettings' };
        siteSettings.og = siteSettings.og || {};
        siteSettings.og.image =
          siteSettings.og.image && siteSettings.og.image.imageId ? siteSettings.og.image : { imageId: '' };
        siteSettings.og.keywords = siteSettings.og.keywords || '';
        siteSettings.og.title = siteSettings.og.title || '';
        siteSettings.twitter = siteSettings.twitter || {};
        siteSettings.twitter.image =
          siteSettings.twitter.image && siteSettings.twitter.image.imageId
            ? siteSettings.twitter.image
            : { imageId: '' };
        siteSettings.twitter.keywords = siteSettings.twitter.keywords || '';
        siteSettings.twitter.title = siteSettings.twitter.title || '';
        this.siteSettings = siteSettings;

        commit('SITE_SETTINGS_LOADED', siteSettings);

        return siteSettings;
      });
    },

    saveSiteSettings({ commit }, { siteSettings, redirects }) {
      return this.$whppt.saveSiteSettings({ siteSettings, redirects }).then(() => {
        commit('SITE_SETTINGS_LOADED', siteSettings);

        this.$toast.global.editorSuccess('Site Settings Saved');
      });
    },

    publishSiteSettings({ commit }, { siteSettings, redirects, categories }) {
      siteSettings._id = siteSettings._id || 'siteSettings';

      return this.$whppt.saveSiteSettings({ siteSettings, redirects, categories }).then(() => {
        return this.$whppt.publishSiteSettings({ siteSettings, redirects, categories }).then(() => {
          this.$toast.global.editorSuccess('Site Settings Published');
        });
      });
    },
  },
  mutations: {
    FOOTER_LOADED(state, footer) {
      state.footer = footer;
    },

    // @deprecated
    // compatibility for FOOTER_LOADED
    footerLoaded(state, footer) {
      state.footer = footer;
    },

    NAV_LOADED(state, nav) {
      state.nav = nav;
    },

    // @deprecated
    // compatibility for NAV_LOADED
    navLoaded(state, nav) {
      state.nav = nav;
    },

    SITE_SETTINGS_LOADED(state, siteSettings) {
      state.siteSettings = siteSettings;
    },

    // @deprecated
    // compatibility for SITE_SETTINGS_LOADED
    siteSettingsLoaded(state, siteSettings) {
      state.siteSettings = siteSettings;
    },
  },
});
