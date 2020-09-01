<template>
  <whppt-tabs @md-changed="tabChanged">
    <whppt-tab v-for="(tab, index) in tabs" :id="tab.name" :key="index" :md-label="tab.label">
      <component :is="selectedTab" :settings="siteSettings" />
    </whppt-tab>
  </whppt-tabs>
</template>

<script>
import { filter, forEach, map } from 'lodash';
import { mapActions } from 'vuex';

import WhpptTabs from '../../ui/Tabs';
import WhpptTab from '../../ui/Tab';
import WhpptButton from '../../ui/Button';

import SEO from './tabs/SettingsSEO';
import Redirects from './tabs/SettingsRedirect';
import Twitter from './tabs/SettingsTwitter';
import OpenGraph from './tabs/SettingsOG';
import General from './tabs/SettingsGeneral';
import Files from './tabs/SettingsFiles';
import Emailer from './tabs/SettingsEmailer';

const additionalTabs = [];
const additionalComponents = {};

const types = global.$whppt.plugins;

const siteSettingTypes = filter(types, t => t.siteSettings);

forEach(siteSettingTypes, type => {
  additionalComponents[type.siteSettings.name] = type.siteSettings.component;
  additionalTabs.push(type.siteSettings);
});

export default {
  name: 'WhpptSiteSettings',
  components: {
    WhpptButton,
    ...additionalComponents,
    SEO,
    Redirects,
    General,
    OpenGraph,
    Twitter,
    Files,
    Emailer,
    WhpptTabs,
    WhpptTab,
  },
  data: () => ({
    usedListings: [],
    warningId: undefined,
    siteSettings: { og: { image: { imageId: '', crop: {} } }, twitter: { image: { imageId: '', crop: {} } } },
    selectedTab: 'general',
  }),
  computed: {
    tabs() {
      return [
        { name: 'general', label: 'General' },
        { name: 'open-graph', label: 'Open Graph' },
        { name: 'twitter', label: 'Twitter' },
        { name: 'redirects', label: 'Redirects' },
        { name: 's-e-o', label: 'SEO' },
        { name: 'files', label: 'Files' },
        { name: 'emailer', label: 'Email (SMTP)' },
        ...additionalTabs,
      ];
    },
    publishing() {
      return !this.$whppt.disablePublishing;
    },
  },
  mounted() {
    this.loadSiteSettings();
  },
  methods: {
    ...mapActions('whppt-nuxt/site', ['saveSiteSettings', 'publishSiteSettings']),
    tabChanged(id) {
      this.selectedTab = id;
    },
    loadSiteSettings() {
      return this.$api.get(`/siteSettings/loadSiteSettings`).then(({ data: siteSettings }) => {
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
      });
    },
    saveSettings() {
      const formattedCategories = map(this.categories, category => {
        return {
          name: category.name,
          _id: category._id,
          filters: map(category.filters, filter => {
            return filter.value.split(',');
          }),
        };
      });
      // TODO: need to check the email address is valid (empty is fine)
      this.saveSiteSettings({
        siteSettings: this.siteSettings,
        categories: formattedCategories,
        redirects: this.redirects,
      });
    },
    publishSettings() {
      const formattedCategories = map(this.categories, category => {
        return {
          name: category.name,
          _id: category._id,
          filters: map(category.filters, filter => {
            return filter.value.split(',');
          }),
        };
      });

      this.publishSiteSettings({
        siteSettings: this.siteSettings,
        categories: formattedCategories,
        redirects: this.redirects,
      });
    },
  },
};
</script>
