<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <div class="whppt-settings__heading whppt-flex-between">
        <p class="whppt-settings__heading-text">Site Settings</p>
        <div class="whppt-flex-between whppt-align-center">
          <button v-if="publishing" class="whppt-settings__button" style="margin-right: 1rem;" @click="publishSettings">
            Publish
          </button>
          <button class="whppt-settings__button" @click="saveSettings">Save</button>
        </div>
      </div>
      <div class="whppt-settings__tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="whppt-settings__tab"
          :class="selectedTab === tab.name ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = tab.name"
        >
          {{ tab.label }}
        </div>
      </div>
      <component :is="selectedTab" :settings="siteSettings" />
    </div>
  </div>
</template>

<script>
import { filter, forEach, map } from 'lodash';
import { mapActions } from 'vuex';

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
    ...additionalComponents,
    SEO,
    Redirects,
    General,
    OpenGraph,
    Twitter,
    Files,
    Emailer,
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

<style>
.whppt-select__frequency-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-select__frequency-info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.whppt-select__frequency-input {
  margin: 0.2rem 0 0.5rem;
  appearance: none;
  display: block;
  width: 100%;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
}

.whppt-settings__column {
  width: 50%;
}

.whppt-linker {
  display: flex;
  margin: 0.4rem 1rem;
}

.whppt-settings__content form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.whppt-settings__content form label {
  font-size: 0.9rem;
}

.whppt-settings__content form input,
.whppt-settings__content form textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.2rem 0 0.5rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  resize: vertical;
}

.whppt-settings__warning-button {
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  background-color: black;
  border-radius: 25px;
}

.whppt-settings__tooltip .whppt-settings__tooltip-text {
  visibility: hidden;
  text-align: center;
  border: 1px solid #981a31;
  padding: 2px 6px;
  position: absolute;
  z-index: 100;
  margin-top: -2rem;
  background: white;
  border-radius: 0.25rem;
}
.whppt-settings__tooltip:hover .whppt-settings__tooltip-text {
  visibility: visible;
}

.whppt-icon {
  display: inline-block;
  color: black;
}

.whppt-flex-1 {
  flex: 1;
}

.whppt-w-full {
  width: 100%;
}

.whppt-flex-wrap {
  flex-wrap: wrap;
}

.whppt-settings__page-result {
  color: gray;
  font-style: italic;
  padding-top: 2rem;
}

.whppt-overflow-auto {
  overflow: auto;
}

.whppt-ml-auto {
  margin-left: auto;
}

.whppt-ml-4 {
  margin-left: 1rem;
}
.whppt-mr-4 {
  margin-right: 1rem;
}
.whppt-mt-8 {
  margin-top: 2rem;
}
.whppt-settings__ordered-cats-container {
  overflow: auto;
  max-height: 500px;
}
.whppt-font-bold {
  font-weight: bold;
}
.whppt-text-center {
  text-align: center;
}
.whppt-settings__used-listings-container {
  color: #222;
  font-style: italic;
}
.whppt-mb-2 {
  margin-bottom: 0.5rem;
}
.whppt-cursor-default {
  cursor: default;
}
.whppt-text-gray-500 {
  color: #333;
}
</style>
