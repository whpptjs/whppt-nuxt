<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <div class="whppt-settings__heading whppt-flex-between">
        <p class="whppt-settings__heading-text">Site Settings</p>
        <div class="whppt-flex-between whppt-align-center">
          <button class="whppt-settings__button" style="margin-right: 1rem;" @click="publishSettings">
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
          :class="selectedTab === tab.component ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = tab.component"
        >
          {{ tab.label }}
        </div>
      </div>
      <component :is="selectedTab" :settings="siteSettings" />
    </div>
  </div>
</template>

<script>
import { map } from 'lodash';
import { mapState, mapActions } from 'vuex';

import SEO from './SettingsSEO';
import Redirects from './SettingsRedirect';
import Twitter from './SettingsTwitter';
import OpenGraph from './SettingsOG';
import General from './SettingsGeneral';
import Categories from './SettingsCategories';

export default {
  name: 'WhpptSiteSettings',
  components: {
    SEO,
    Redirects,
    General,
    OpenGraph,
    Twitter,
    Categories,
  },
  data: () => ({
    usedListings: [],
    warningId: undefined,
    siteSettings: { og: { image: {} }, twitter: { image: {} } },
    selectedTab: 'general',
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['options', 'baseAPIUrl']),
    tabs() {
      const tabs = [
        { name: 'general', label: 'General', component: 'general' },
        { name: 'og', label: 'Open Graph', component: 'open-graph' },
        { name: 'twitter', label: 'Twitter', component: 'twitter' },
        { name: 'redirects', label: 'Redirects', component: 'redirects' },
        { name: 'seo', label: 'SEO', component: 's-e-o' },
        { name: 'categories', label: 'Categories', component: 'categories' },
      ];

      const siteTabs = this.options.siteSettings;

      if (siteTabs && siteTabs.length) tabs.push(...siteTabs);

      return tabs;
    },
  },
  mounted() {
    this.loadSiteSettings();
  },
  methods: {
    ...mapActions('whppt-nuxt/site', ['saveSiteSettings', 'publishSiteSettings']),
    loadSiteSettings() {
      return this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadSiteSettings`).then(({ data: siteSettings }) => {
        this.siteSettings = siteSettings || { _id: 'siteSettings' };
        this.siteSettings.og = this.siteSettings.og || { title: '', keywords: '', image: { imageId: '', crop: {} } };
        this.siteSettings.twitter = this.siteSettings.twitter || {
          title: '',
          keywords: '',
          image: { imageId: '', crop: {} },
        };
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
.whppt-settings {
  color: black;
  display: flex;
  z-index: 52;
  width: 75%;
  min-height: 80vh;
  max-height: 90vh;
  margin: 1.5rem;
  position: relative;
}

.whppt-settings__content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  width: 100%;
}

.whppt-settings__heading {
  align-items: center;
  font-weight: bold;
  background: white;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 2.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 4rem;
}

.whppt-settings__button {
  color: #981a31;
  border-radius: 0.5rem;
  margin-left: auto;
  padding: 0.5rem 0.75rem;
  border: 1px solid #981a31;
}

.whppt-settings__tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #981a31;
  padding: 1rem 1rem 0 1rem;
}

.whppt-settings__tab {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 0.5rem;
}

.whppt-settings__tab-selected {
  background: #981a31;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 0.5rem;
}

.whppt-settings__heading-text {
  font-size: 1.75rem;
  color: #981a31;
}

.whppt-warning {
  color: black;
  display: flex;
  z-index: 53;
  width: 100%;
  height: 80vh;
  margin: 1.5rem;
  position: relative;
}

/* .whppt-settings__category {
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
  flex: 1;
} */

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

.whppt-settings__content form > fieldset {
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  border: none;
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
