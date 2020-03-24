<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <div
        v-if="showSlugModal || showWarning"
        style="background: rgba(0, 0, 0, .5); position: absolute; top: 0; left: 0; right: 0; bottom: 0"
      ></div>
      <div v-if="showWarning" class="whppt-settings__warning-modal">
        <div class="whppt-settings__warning-content">
          <div style="position: relative; text-align: center;">
            <div class="whppt-settings__warning-heading">Confirm Delete</div>
            <div class="whppt-settings__warning-body">
              <div>
                Are you sure?
              </div>
              <div>
                This will delete the page and all of its content.
              </div>
            </div>
            <div class="whppt-settings__warning-actions">
              <button class="whppt-settings__warning-button" @click="deletePageFromDraft()">
                Delete
              </button>
              <button class="whppt-settings__warning-button" @click="showWarning = false">Cancel</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div v-if="showSlugModal" class="whppt-settings__warning-modal">
        <div class="whppt-settings__warning-content">
          <form @submit.prevent style="position: relative; ">
            <div class="whppt-settings__warning-heading" style="text-align: center;">Edit Slug</div>
            <div class="whppt-settings__warning-body">
              <div>
                <div v-if="prefix" class="whppt-flex-between whppt-align-center">
                  <whppt-text-input
                    :value="prefix"
                    :disabled="true"
                    placeholder="Page Slug Prefix"
                    label="Prefix"
                    labelColour="black"
                    info="This prefix is managed by Whppt and is not editable."
                  />
                  <whppt-text-input
                    :value="slugSuffix"
                    placeholder="Enter a page slug"
                    label="Slug"
                    labelColour="black"
                    @input="confirmSlug"
                    info="The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. Your input will be formatted to avoid certain characters."
                  />
                </div>
                <div v-if="!prefix">
                  <whppt-text-input
                    v-model="slugCopy"
                    placeholder="Enter a page slug"
                    label="Slug"
                    label-colour="black"
                    info="The page slug makes up part of the page's url that is shown in the browsers address bar and is used by search engines to match your page with search terms. Your input will be formatted to avoid certain characters."
                  />
                </div>
                <div style="display: flex; align-items: center; justify-content: flex-start">
                  <div style="font-weight: bold; padding-right: 0.5rem;">Output:</div>
                  <div>
                    {{ formattedSlug }}
                  </div>
                </div>
              </div>
            </div>
            <div class="whppt-settings__warning-actions">
              <button class="whppt-settings__warning-button" @click="saveSlug">
                Save
              </button>
              <button class="whppt-settings__warning-button" @click="showSlugModal = false">Close</button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
      <div class="whppt-settings__heading" :style="`background: ${showSlugModal || showWarning ? 'grey' : 'white'}`">
        <h2 class="whppt-settings__heading-text">Page Settings</h2>
        <button class="whppt-settings__button" @click="saveSettings">Save</button>
      </div>
      <div class="whppt-settings__tabs">
        <div
          @click="selectedTab = 'general'"
          class="whppt-settings__tab"
          :class="selectedTab === 'general' ? 'whppt-settings__tab-selected' : ''"
        >
          General
        </div>
        <div
          @click="selectedTab = 'seo'"
          class="whppt-settings__tab"
          :class="selectedTab === 'seo' ? 'whppt-settings__tab-selected' : ''"
        >
          SEO
        </div>

        <div
          @click="selectedTab = 'og'"
          class="whppt-settings__tab"
          :class="selectedTab === 'og' ? 'whppt-settings__tab-selected' : ''"
        >
          Open Graph
        </div>

        <div
          @click="selectedTab = 'twitter'"
          class="whppt-settings__tab"
          :class="selectedTab === 'twitter' ? 'whppt-settings__tab-selected' : ''"
        >
          Twitter
        </div>
      </div>
      <div>
        <form @submit.prevent v-show="selectedTab === 'general'">
          <div>
            <fieldset>
              <whppt-text-input
                v-model="page.slug"
                placeholder="Enter a page slug"
                label="Slug"
                :disabled="true"
                labelColour="black"
              />
              <div class="whppt-justify-start whppt-align-center">
                <button class="whppt-settings__button" @click="openSlugModal">
                  Change Slug
                </button>
                <button type="button" class="whppt-settings__delete-button" @click="showWarning = true">
                  Delete Page
                </button>
              </div>
            </fieldset>
          </div>
        </form>
        <form @submit.prevent v-show="selectedTab === 'seo'">
          <div>
            <fieldset>
              <div class="whppt-flex-between">
                <div class="whppt-settings__left-column">
                  <whppt-text-input
                    v-model="page.title"
                    placeholder="Enter a page title"
                    label="Title"
                    labelColour="black"
                    info="The page title is shown in the browser's tab and used by search engines to match your page with search terms. Search results use the title to list the page."
                  />
                </div>
                <div class="whppt-settings__right-column">
                  <whppt-text-input
                    v-model="page.keywords"
                    placeholder="keywords (eg. page, simple)"
                    label="Keywords"
                    labelColour="black"
                    info="Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
                  />
                </div>
              </div>
              <div>
                <whppt-text-area
                  v-model="page.description"
                  placeholder="Enter description"
                  label="Description"
                  rows="2"
                  labelColour="black"
                  info="The page description is not shown the page and is used by search engines to match your page with search terms. Search results can show this description."
                />
              </div>
              <div class="whppt-flex-between">
                <div class="whppt-settings__left-column">
                  <whppt-text-input
                    v-model="page.priority"
                    placeholder="Enter a priority"
                    label="Priority"
                    @change="clampInput"
                    labelColour="black"
                    info="Priority lets search engines know which pages you deem most important. Values range from 0.0 to 1.0, with a default value of 0.5."
                  />
                </div>
                <div class="whppt-settings__right-column">
                  <div class="whppt-select__frequency-label">Frequency</div>
                  <select v-model="page.frequency" class="whppt-select__frequency-input">
                    <option v-for="(item, index) in frequencies" :key="index">
                      {{ item.value }}
                    </option>
                  </select>
                  <div class="whppt-select__frequency-info">
                    Frequency tells search engines how often the page is likely to change.
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
        <form @submit.prevent v-show="selectedTab === 'og'">
          <settings-open-graph :settings="page"></settings-open-graph>
        </form>
        <form @submit.prevent v-show="selectedTab === 'twitter'">
          <settings-twitter :settings="page"></settings-twitter>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { clamp } from 'lodash';
import slugify from 'slugify';

import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptTextArea from '../whpptComponents/WhpptTextArea';
import WhpptSelect from '../whpptComponents/WhpptSelect';
import Gallery from './EditImage/Gallery';
import Cropping from './EditImage/Cropping';
import SettingsOpenGraph from './SiteSettings/SettingsOG';
import SettingsTwitter from './SiteSettings/SettingsTwitter';

export default {
  name: 'WhpptSiteSettings',
  components: { WhpptTextInput, WhpptSelect, Gallery, Cropping, SettingsOpenGraph, SettingsTwitter, WhpptTextArea },
  props: { prefix: { type: String, default: '' } },
  data() {
    return {
      showWarning: false,
      selectedTab: 'general',
      showSlugModal: false,
      slugCopy: '',
      frequencies: [
        { value: 'never', id: 'never' },
        { value: 'yearly', id: 'yearly' },
        { value: 'monthly', id: 'monthly' },
        { value: 'weekly', id: 'weekly' },
        { value: 'daily', id: 'daily' },
        { value: 'hourly', id: 'hourly' },
        { value: 'always', id: 'always' },
      ],
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'baseImageUrl']),
    ...mapState('whppt-nuxt/page', ['page']),
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
    ...mapActions('whppt-nuxt/page', ['savePage', 'deletePage']),
    select(event) {
      this.page.frequency = event.target.value;
    },
    confirmSlug(value) {
      value = this.formatSlug(value);
      if (this.prefix) value = `${this.prefix}/${value}`;
      this.slugCopy = value;
    },
    clampInput(input) {
      input ? (this.page.priority = clamp(input, 0, 1)) : 0.5;
    },
    saveSettings() {
      if (this.page.priority) {
        this.page.priority = clamp(this.page.priority, 0, 1);
      }
      return this.savePage();
    },
    openSlugModal() {
      this.showSlugModal = true;
      this.slugCopy = this.page.slug;
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');
      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');
      return slug;
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
          return;
        } else {
          vm.page.slug = newSlug;
          return vm.savePage().then(() => {
            vm.$router.push(`/${newSlug}`);
            vm.$emit('closeModal');
          });
        }
      });
    },
    deletePageFromDraft() {
      const vm = this;
      if (vm.page.published) {
        return vm.$toast.global.editorError('Unpublish the page first');
      }
      return vm.deletePage().then(() => {
        vm.$router.push(`/`);
        vm.showWarning = false;
        vm.$emit('closeModal');
      });
    },
  },
};
</script>

<style>
.whppt-warning {
  color: black;
  display: flex;
  z-index: 53;
  width: 100%;
  height: 80vh;
  margin: 1.5rem;
  position: relative;
}

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

.whppt-linker__labels span {
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.whppt-settings__form-controls {
  display: flex;
  /*justify-content: center;*/
  align-items: center;
}

.whppt-settings__left-column {
  /* w-1/2 pr-4 */
  width: 50%;
  padding-right: 1rem;
}

.whppt-settings__right-column {
  /* w-1/2 pr-4 */
  width: 50%;
  padding-left: 1rem;
}

.whppt-label {
  /* color: white; */
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-settings__form-controls span {
  margin-right: auto;
}

.whppt-settings__modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 53;
}

.whppt-settings__modal--inner {
  margin: 1rem auto;
  /*width: 33.33%;*/
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
