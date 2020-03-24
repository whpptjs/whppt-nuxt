<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <!--      :style="`background: ${showSlugModal || showWarning ? 'grey' : 'white'}`"-->
      <div class="whppt-settings__heading">
        <h2 class="whppt-settings__heading-text">Page Settings</h2>
        <button class="whppt-settings__button" @click="saveSettings">Save</button>
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
      <component :is="selectedTab" :page="page" />
    </div>
  </div>
</template>

<script>
import { clamp, filter, forEach } from 'lodash';
import { mapActions, mapState } from 'vuex';

import slugify from 'slugify';
import SEO from './tabs/SEO';
import Twitter from './tabs/Twitter';
import OpenGraph from './tabs/OpenGraph';
import General from './tabs/General';

const additionalTabs = [];
const additionalComponents = {};

const types = global.$whppt.types;

const pageSettingTypes = filter(types, t => t.pageSettings);

forEach(pageSettingTypes, type => {
  additionalComponents[type.pageSettings.name] = type.pageSettings.component;
  additionalTabs.push(type.pageSettings);
});

export default {
  name: 'WhpptSiteSettings',
  components: {
    ...additionalComponents,
    SEO,
    General,
    Twitter,
    OpenGraph,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    usedListings: [],
    warningId: undefined,
    siteSettings: { og: { image: {} }, twitter: { image: {} } },
    selectedTab: 'general',
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    ...mapState('whppt-nuxt/page', ['page']),
    tabs() {
      return [
        { name: 'general', label: 'General' },
        { name: 's-e-o', label: 'Seo' },
        { name: 'open-graph', label: 'Open Graph' },
        { name: 'twitter', label: 'Twitter' },
        ...additionalTabs,
      ];
    },
    formattedSlug() {
      return this.formatSlug(this.slugCopy);
    },
    slugSuffix() {
      if (!this.prefix) return '';
      return this.slugCopy.replace(`${this.prefix}/`, '');
    },
  },
  mounted() {
    this.page.og = this.page.og || { title: '', keywords: '', image: { imageId: '', crop: {} } };
    this.page.twitter = this.page.twitter || { title: '', keywords: '', image: { imageId: '', crop: {} } };
    this.page.frequency = this.page.frequency || 'yearly';
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage']),
    saveSettings() {
      if (this.page.priority) {
        this.page.priority = clamp(this.page.priority, 0, 1);
      }
      return this.savePage();
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');
      return slug;
    },
    confirmSlug(value) {
      value = this.formatSlug(value);
      if (this.prefix) value = `${this.prefix}/${value}`;
      this.slugCopy = value;
    },
    saveSlug() {
      const vm = this;
      const newSlug = this.formattedSlug;
      if (!newSlug) {
        this.$toast.global.editorError('Cannot use an empty slug');
        return;
      }
      return vm.$whppt.checkSlug({ slug: newSlug, _id: this.page._id }).then(result => {
        if (result) {
          this.$toast.global.editorError('Slug already in use');
        } else {
          vm.page.slug = newSlug;
          return vm.savePage().then(() => {
            vm.$router.push(`/${newSlug}`);
            vm.$emit('closeModal');
          });
        }
      });
    },
  },
};
</script>

<style>
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
