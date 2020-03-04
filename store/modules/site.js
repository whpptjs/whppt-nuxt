export default options => ({
  namespaced: true,
  state: () => ({
    options,
    footer: undefined,
    nav: undefined,
    siteSettings: undefined,
  }),
  actions: {
    saveFooter({ state, commit }) {
      return this.$whppt.saveFooter(state.footer).then(footer => {
        this.$toast.global.editorSuccess('Footer Saved');
        commit('footerLoaded', footer);
      });
    },
    publishFooter({ state }) {
      return this.$whppt.publishFooter(state.footer).then(() => {
        this.$toast.global.editorSuccess('Footer Published');
      });
    },
    loadFooter({ commit }) {
      return this.$whppt.loadFooter().then(footer => {
        commit('footerLoaded', footer);
      });
    },
    saveNav({ state, commit }) {
      return this.$whppt.saveNav(state.nav).then(nav => {
        this.$toast.global.editorSuccess('Nav Saved');
        commit('navLoaded', nav);
      });
    },
    publishNav({ state }) {
      return this.$whppt.publishNav(state.nav).then(() => {
        this.$toast.global.editorSuccess('Nav Published');
      });
    },
    loadNav({ commit }) {
      return this.$whppt.loadNav().then(nav => {
        commit('navLoaded', nav);
      });
    },
    loadSiteSettings({ commit }) {
      return this.$whppt.loadSiteSettings().then(siteSettings => {
        siteSettings = siteSettings || { _id: 'siteSettings' };
        siteSettings.og = siteSettings.og || { title: '', keywords: '', image: { imageId: '', crop: {} } };
        siteSettings.twitter = siteSettings.twitter || {
          title: '',
          keywords: '',
          image: { imageId: '', crop: {} },
        };
        commit('siteSettingsLoaded', siteSettings);
      });
    },
    saveSiteSettings({ commit }, { siteSettings, redirects, categories }) {
      return this.$whppt.saveSiteSettings({ siteSettings, redirects, categories }).then(() => {
        this.$toast.global.editorSuccess('Site Settings Saved');
      });
    },
    publishSiteSettings({ commit }, { siteSettings, redirects, categories }) {
      return this.$whppt.publishSiteSettings({ siteSettings, redirects, categories }).then(() => {
        this.$toast.global.editorSuccess('Site Settings Published');
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
