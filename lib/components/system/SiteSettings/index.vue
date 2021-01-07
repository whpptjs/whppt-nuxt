<template>
  <whppt-tabs position="fixed" @changed="tabChanged">
    <whppt-tab v-for="(tab, index) in tabs" :id="tab.name" :key="index" :name="tab.label">
      <component :is="selectedTab" :settings="siteSettings" @publish-settings="publishSettings" />
    </whppt-tab>
  </whppt-tabs>
</template>

<script>
import { map } from 'lodash';
import { mapActions, mapState } from 'vuex';

import WhpptTabs from '../../ui/Tabs';
import WhpptTab from '../../ui/Tab';
import WhpptButton from '../../ui/Button';

import SEO from './tabs/SettingsSEO';
import Redirects from './tabs/SettingsRedirect';
import Twitter from './tabs/SettingsTwitter';
import OpenGraph from './tabs/SettingsOG';
import General from './tabs/SettingsGeneral';
import Files from './tabs/SettingsFiles';
import Roles from './tabs/Roles';

const { additionalTabs, additionalComponents } = global.$whppt.getAdditionalComponents('siteSettings');

export default {
  name: 'WhpptSiteSettings',
  components: {
    ...additionalComponents,
    SEO,
    Redirects,
    General,
    OpenGraph,
    Twitter,
    Files,
    Roles,
    WhpptButton,
    WhpptTabs,
    WhpptTab,
  },
  data: () => ({
    siteSettings: { og: { image: { imageId: '', crop: {} } }, twitter: { image: { imageId: '', crop: {} } } },
    selectedTab: 'general',
  }),
  computed: {
    ...mapState('whppt/config', ['domain']),
    tabs() {
      return [
        { name: 'general', label: 'General' },
        { name: 'open-graph', label: 'Open Graph' },
        { name: 'twitter', label: 'Twitter' },
        { name: 's-e-o', label: 'SEO' },
        { name: 'redirects', label: 'Redirects' },
        { name: 'files', label: 'Files' },
        { name: 'roles', label: 'Roles' },
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
    tabChanged(_, index) {
      this.selectedTab = this.tabs[index].name;
    },
    loadSiteSettings() {
      return this.$api
        .get(`/siteSettings/loadSiteSettings?domainId=${this.domain._id}`)
        .then(({ data: siteSettings }) => {
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
