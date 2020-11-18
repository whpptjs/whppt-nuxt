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
        commit('footerLoaded', footer);
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
        commit('footerLoaded', footer);
      });
    },
    saveNav({ state, commit, rootState }) {
      const domainId = rootState['whppt/config'].domain && rootState['whppt/config'].domain._id;

      return this.$whppt.saveNav({ ...state.nav, domainId }).then(nav => {
        this.$toast.global.editorSuccess('Nav Saved');
        commit('navLoaded', nav);
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
        commit('navLoaded', nav);
      });
    },
    loadSiteSettings({ commit, rootState }, { domain } = {}) {
      const currentDomain = domain || rootState['whppt/config'].domain;

      const domainId = currentDomain && currentDomain._id;

      return this.$whppt.loadSiteSettings({ domainId }).then(siteSettings => {
        siteSettings = siteSettings || { _id: 'siteSettings' };
        siteSettings.og = siteSettings.og || {};
        siteSettings.og.image =
          siteSettings.og.image && siteSettings.og.image.imageId
            ? siteSettings.og.image
            : { imageId: '', crop: { desktop: {} } };
        siteSettings.og.keywords = siteSettings.og.keywords || '';
        siteSettings.og.title = siteSettings.og.title || '';
        siteSettings.twitter = siteSettings.twitter || {};
        siteSettings.twitter.image =
          siteSettings.twitter.image && siteSettings.twitter.image.imageId
            ? siteSettings.twitter.image
            : { imageId: '', crop: { desktop: {} } };
        siteSettings.twitter.keywords = siteSettings.twitter.keywords || '';
        siteSettings.twitter.title = siteSettings.twitter.title || '';
        this.siteSettings = siteSettings;
        commit('siteSettingsLoaded', siteSettings);
        return siteSettings;
      });
    },
    saveSiteSettings({ commit }, { siteSettings, redirects }) {
      return this.$whppt.saveSiteSettings({ siteSettings, redirects }).then(() => {
        commit('siteSettingsLoaded', siteSettings);
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
    footerLoaded(state, footer) {
      state.footer = footer;
    },
    navLoaded(state, nav) {
      state.nav = nav;
    },
    siteSettingsLoaded(state, siteSettings) {
      state.siteSettings = siteSettings;
    },
  },
  getters: {},
});
