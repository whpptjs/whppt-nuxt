<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <div class="whppt-settings__heading">
        <p class="font-xl text-red-700">Page Settings</p>
        <button class="whppt-settings__button" @click="saveSettings">Save</button>
      </div>
      <div class="flex justify-start items-center text-red-700 pt-4 px-4">
        <div
          @click="selectedTab = 'seo'"
          class="whppt-settings__tab"
          :class="selectedTab === 'seo' ? 'bg-red-700 text-white' : ''"
        >
          SEO
        </div>

        <div
          @click="selectedTab = 'og'"
          class="whppt-settings__tab"
          :class="selectedTab === 'og' ? 'bg-red-700 text-white' : ''"
        >
          Open Graph
        </div>

        <div
          @click="selectedTab = 'twitter'"
          class="whppt-settings__tab"
          :class="selectedTab === 'twitter' ? 'bg-red-700 text-white' : ''"
        >
          Twitter
        </div>
      </div>
      <form @submit.prevent v-if="selectedTab === 'seo'">
        <div>
          <fieldset>
            <div class="whppt-flex-between">
              <div class="w-1/2 pr-4">
                <whppt-text-input
                  v-model="page.title"
                  placeholder="Enter a page title"
                  label="Title"
                  labelColour="black"
                  info="The page title is shown in the browsers tab and used by search engines to match your page with search terms. Search results use the title to list the page."
                />
              </div>
              <div class="w-1/2 pl-4">
                <whppt-text-input
                  v-model="page.keywords"
                  placeholder="keywords, for, the, page"
                  label="Keywords"
                  labelColour="black"
                  info="Keywords are not shown on the page and are used by search engines to match your page with search terms. To add multiple, comma seperate them."
                />
              </div>
            </div>
            <div>
              <whppt-text-input
                v-model="page.description"
                placeholder="Enter description"
                label="Description"
                labelColour="black"
                info="The page description is not shown the page and is used by search engines to match your page with search terms. Search results can show this description."
              />
            </div>
          </fieldset>
        </div>
      </form>
      <form @submit.prevent v-if="selectedTab === 'og'">
        <div>
          <fieldset>
            <div class="whppt-flex-between">
              <div class="w-1/2 pr-4">
                <whppt-text-input
                  v-model="page.og.title"
                  placeholder="OG title"
                  label="Title"
                  labelColour="black"
                  info="Open graph title is shown on most social media platforms as the title in a card that is created when this settingss url is used. E.g. Facebook."
                />
              </div>
              <div class="w-1/2 pl-4">
                <whppt-text-input
                  v-model="page.og.keywords"
                  placeholder="keywords, for, OG"
                  label="Keywords"
                  labelColour="black"
                  info="Open graph description is shown on most social media platforms as the description in a card that is created when this settingss url is used. E.g. Facebook."
                />
              </div>
            </div>

            <div class="whppt-label">Image</div>
            <div v-if="!page.og.image.imageId">
              <Gallery :limit="7" imageDisplaySize="25%" @input="openCropperOG"></Gallery>
            </div>
            <div v-if="page.og.image.imageId" class="text-center">
              <cropping :image-options="page.og.image" :sizes="sizes" @imageRemoved="removeImage('og')" />
            </div>
          </fieldset>
        </div>
      </form>
      <form @submit.prevent v-if="selectedTab === 'twitter'">
        <div>
          <fieldset>
            <div class="whppt-flex-between">
              <div class="w-1/2 pr-4">
                <whppt-text-input
                  v-model="page.twitter.title"
                  placeholder="Twitter title"
                  label="Title"
                  labelColour="black"
                  info="Twitter title is shown on most social media platforms as the title in a card that is created when this pages url is used."
                />
              </div>
              <div class="w-1/2 pl-4">
                <whppt-text-input
                  v-model="page.twitter.keywords"
                  placeholder="keywords, for, twitter"
                  label="Keywords"
                  labelColour="black"
                  info="Twitter description is shown on most social media platforms as the description in a card that is created when this pages url is used."
                />
              </div>
            </div>

            <div class="whppt-label">Image</div>
            <div v-if="!page.twitter.image.imageId">
              <Gallery :limit="7" imageDisplaySize="25%" @input="openCropperTwitter"></Gallery>
            </div>
            <div v-if="page.twitter.image.imageId" class="text-center">
              <cropping :image-options="page.twitter.image" :sizes="sizes" @imageRemoved="removeImage('twitter')" />
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';

import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import Gallery from './EditImage/Gallery';
import Cropping from './EditImage/Cropping';

export default {
  name: 'WhpptSiteSettings',
  components: { WhpptTextInput, Gallery, Cropping },
  data() {
    return {
      showError: false,
      selectedTab: 'seo',
      sizes: { desktop: { width: 400, height: 209, quality: 1 } },
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'baseImageUrl']),
    ...mapState('whppt-nuxt/page', ['page']),
  },
  mounted() {
    this.page.og = this.page.og || { title: '', keywords: '', image: { imageId: '', crop: {} } };
    this.page.twitter = this.page.twitter || { title: '', keywords: '', image: { imageId: '', crop: {} } };
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage']),
    removeImage(type) {
      if (type === 'og') this.page.og.image.imageId = '';
      else if (type === 'twitter') this.page.twitter.image.imageId = '';
    },
    openCropperOG(id) {
      this.page.og.image.imageId = id;
    },
    openCropperTwitter(id) {
      this.page.twitter.image.imageId = id;
    },
    saveSettings() {
      return this.savePage();
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
  height: 80vh;
  margin: 1.5rem;
  position: relative;
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

.whppt-settings__category {
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
  flex: 1;
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

.whppt-settings__content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  width: 100%;
}

.whppt-settings__modal--inner {
  margin: 1rem auto;
  /*width: 33.33%;*/
}

.whppt-settings__heading {
  align-items: center;
  font-weight: bold;
  position: sticky;
  background-color: white;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 4rem;
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
  outline: none;
  resize: vertical;
}

.whppt-settings__button {
  /* @apply text-red-700 rounded-lg ml-auto px-3 py-2 bg-white border-red-700 border-1 */
  color: #981a31;
  border-radius: 0.5rem;
  margin-left: auto;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #981a31;
  /* margin-left: auto;
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  border-radius: 10px; */
}

.whppt-settings__tab {
  /* @apply px-3 py-2 rounded-lg cursor-pointer mx-2 */
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 0.5rem;
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
