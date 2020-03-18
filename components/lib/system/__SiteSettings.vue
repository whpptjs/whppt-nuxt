<template>
  <div class="whppt-settings">
    <div v-if="!showWarning" class="whppt-settings__content">
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
          class="whppt-settings__tab"
          :class="selectedTab === 'general' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'general'"
        >
          General
        </div>
        <div
          class="whppt-settings__tab"
          :class="selectedTab === 'seo' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'seo'"
        >
          SEO
        </div>
        <div
          class="whppt-settings__tab"
          :class="selectedTab === 'og' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'og'"
        >
          Open Graph
        </div>

        <div
          class="whppt-settings__tab"
          :class="selectedTab === 'twitter' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'twitter'"
        >
          Twitter
        </div>
        <div
          class="whppt-settings__tab"
          :class="selectedTab === 'redirects' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'redirects'"
        >
          Redirects
        </div>
        <div
          class="whppt-settings__tab"
          :class="selectedTab === 'email' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'email'"
        >
          Email
        </div>
        <div
          class="whppt-settings__tab"
          :class="selectedTab === 'categories' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'categories'"
        >
          Categories
        </div>
        <!-- <div
          class="whppt-settings__tab"
          :class="selectedTab === 'customListings' ? 'whppt-settings__tab-selected' : ''"
          @click="selectedTab = 'customListings'"
        >
          Custom Listings
        </div> -->
      </div>
      <form v-show="selectedTab === 'seo'" @submit.prevent>
        <div>
          <fieldset>
            <div class="whppt-flex-between">
              <div class="whppt-settings__left-column">
                <whppt-text-input
                  v-model="siteSettings.title"
                  placeholder="Enter a title"
                  label="Title"
                  label-colour="black"
                  info="This title will be used as a fallback for any page without one. The page title is shown in the browser's tab and used by search engines to match your page with search terms. Search results use the title to list the page."
                />
              </div>
              <div class="whppt-settings__right-column">
                <whppt-text-input
                  v-model="siteSettings.keywords"
                  placeholder="keywords (eg. page, simple)"
                  label="Keywords"
                  label-colour="black"
                  info="These keywords will be used as a fallback for any page without them. Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
                />
              </div>
            </div>
            <div>
              <whppt-text-area
                v-model="siteSettings.description"
                placeholder="Enter description"
                label="Description"
                rows="2"
                labelColour="black"
                info="This description will be used as a fallback for any page without one. The page description is not shown the page and is used by search engines to match your page with search terms. Search results can show this description."
              />
            </div>
          </fieldset>
        </div>
      </form>
      <form v-show="selectedTab === 'general'" @submit.prevent>
        <div>
          <fieldset>
            <div>
              <label for="email">Email</label>
              <settings-email :settings="siteSettings"></settings-email>
            </div>
            <div>
              <label for="name">Nav</label>
              <button class="whppt-settings__button" @click="pubNav">
                Publish Nav
              </button>
            </div>
            <div>
              <label for="name">Footer</label>
              <button class="whppt-settings__button" @click="pubFooter">
                Publish Footer
              </button>
            </div>
            <div>
              <label>Mailing List</label>
              <div>
                <whppt-text-input
                  v-model="siteSettings.subscriptionListId"
                  placeholder="e.g. 12345678"
                  label="Subscription Mail List ID"
                  labelColour="black"
                  info="The ID of the mailing list that users will be subscribed to if they opt in."
                />
              </div>
            </div>
          </fieldset>
        </div>
      </form>
      <form v-show="selectedTab === 'categories'" @submit.prevent>
        <div>
          <fieldset>
            <div class="whppt-flex-between whppt-align-center">
              <label for="name">Listing Categories</label>

              <button class="whppt-settings__button" @click="addCategory">Add New Category</button>
            </div>
            <div class="whppt-flex whppt-w-full" style="padding-top: 20px;">
              <div v-if="!selectedCat" class="whppt-flex-1">
                <div
                  v-for="(category, index) in categories"
                  :key="index"
                  class="whppt-settings__category whppt-flex-between whppt-divider"
                  style="cursor: pointer; margin-right: 20px;"
                  @click.stop="selectCat(category, index)"
                >
                  <div class="whppt-mb-2 ">
                    {{ category.name }}
                  </div>
                  <div class="whppt-flex-between whppt-align-center">
                    <div class="whppt-redirects__icon" @click.stop="saveCat(category)">
                      <w-save></w-save>
                    </div>
                    <div class="whppt-redirects__icon" @click.stop="publishCat(category)">
                      <w-publish></w-publish>
                    </div>
                    <div class="whppt-redirects__icon" @click.stop="unpublishCat(category)">
                      <w-close></w-close>
                    </div>
                    <div class="whppt-redirects__icon" @click.stop="openWarning(category)">
                      <w-remove></w-remove>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="selectedCat" class="whppt-settings__category" style="width: 75%;">
                <div class="whppt-flex-between whppt-align-center">
                  <label for="name">Category: </label>
                  <div class="whppt-redirects__icon" @click="selectedCat = undefined">
                    <w-close></w-close>
                  </div>
                </div>
                <div>
                  <whppt-text-input
                    v-model="selectedCat.name"
                    labelColour="black"
                    placeholder="Enter category name"
                    label="Name"
                  />
                  <label>Filters: </label>
                  <div>
                    <div v-for="(filter, filterIndex) in selectedCat.filters" :key="filterIndex">
                      <div class="whppt-flex-start" style="align-items: flex-start">
                        <div style="width: 100%;">
                          <whppt-text-input
                            v-model="filter.value"
                            placeholder="Enter categories to filter by"
                            info="event, restaurant, etc."
                          />
                        </div>
                        <button
                          class="whppt-redirects__icon"
                          :class="selectedCat.filters.length <= 1 ? 'whppt-cursor-default' : ''"
                          aria-label="Remove Category"
                          @click="selectedCat.filters.length > 1 ? removeFilter(filterIndex) : ''"
                        >
                          <w-remove :class="selectedCat.filters.length <= 1 ? 'whppt-text-gray-500' : ''"></w-remove>
                        </button>
                      </div>
                      <label
                        v-if="filterIndex < selectedCat.filters.length - 1"
                        class="whppt-text-gray-500 whppt-mr-4 whppt-ml-4"
                        style="padding: 0 10px;"
                        >{{ '(AND)' }}</label
                      >
                    </div>
                  </div>
                  <button class="whppt-redirects__icon" aria-label="Add Category" @click="addOrFilter()">
                    <w-add-circle></w-add-circle>
                  </button>
                </div>
              </div>
              <div class="whppt-settings__category" style="text-align: center; width: 25%;">
                <div class="whppt-font-bold">
                  Tag category fields
                </div>
                <div class="whppt-settings__ordered-cats-container">
                  <div v-for="cat in orderedAllCats" :key="cat">{{ cat }}</div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </form>

      <form v-show="selectedTab === 'og'" @submit.prevent>
        <settings-open-graph :settings="siteSettings"></settings-open-graph>
      </form>
      <!-- <form v-show="selectedTab === 'customListings'" @submit.prevent>
        <custom-listings></custom-listings>
      </form> -->

      <form v-show="selectedTab === 'twitter'" @submit.prevent>
        <settings-twitter :settings="siteSettings"></settings-twitter>
      </form>

      <form v-show="selectedTab === 'redirects'" @submit.prevent>
        <settings-redirect
          :redirects="slicedRedirects"
          :pages="pages"
          :current-page="currentPage"
          @addedRedirect="addedRedirect"
          @deleteRedirect="deleteRedirect"
          @swapPage="swapPage"
        ></settings-redirect>
      </form>

      <form v-show="selectedTab === 'email'" @submit.prevent>
        <settings-email :settings="siteSettings"></settings-email>
      </form>
    </div>
    <div v-if="showWarning" class="whppt-settings__content">
      <div class="whppt-settings__heading whppt-flex-between">
        <p class="whppt-settings__heading-text">Site Settings</p>
      </div>
      <div v-if="usedListings && usedListings.length" class="whppt-text-center">
        <p>
          WARNING
        </p>
        <p>This category is currently being used on {{ usedListings && usedListings.length }} page(s)</p>
        <p>
          You will need to remove this category from use to delete it
        </p>
        <p class="whppt-settings__page-result">
          These pages are:
        </p>

        <div v-for="(page, index) in usedListings" :key="index" class="whppt-settings__used-listings-container">
          {{ page }}
        </div>
        <button class="whppt-settings__warning-button whppt-mt-8" @click="closeWarning()">Close</button>
      </div>
      <div v-else class="whppt-text-center">
        <p>
          WARNING
        </p>
        <p>
          This action will delete this category permanently, are you sure?
        </p>
        <div class="whppt-align-center">
          <button class="whppt-settings__warning-button whppt-mt-8 whppt-mr-4" @click="removeCategory()">Yes</button>
          <button class="whppt-settings__warning-button whppt-mt-8 whppt-ml-4" @click="closeWarning()">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { map, remove, orderBy } from 'lodash';
import { mapState, mapActions } from 'vuex';

import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptTextArea from '../whpptComponents/WhpptTextArea';
// import SettingsOpenGraph from './__SettingsOG';
// import SettingsTwitter from './__SettingsTwitter';
// import SettingsRedirect from './__SettingsRedirect';
// import SettingsEmail from './__SettingsEmail';
import CustomListings from './CustomListings';

export default {
  name: 'WhpptSiteSettings',
  components: {
    WhpptTextInput,
    // SettingsOpenGraph,
    // SettingsTwitter,
    // SettingsRedirect,
    // SettingsEmail,
    WhpptTextArea,
    CustomListings,
  },
  data() {
    return {
      loadedCategories: [],
      categories: [],
      allCategories: [],
      showWarning: false,
      selectedCat: undefined,
      selectedIndex: undefined,
      usedListings: [],
      warningId: undefined,
      redirects: [],
      slicedRedirects: [],
      siteSettings: { og: { image: {} }, twitter: { image: {} } },
      selectedTab: 'seo',
      pages: 0,
      currentPage: 0,
      limit: 4,
    };
  },
  // computed: {
  //   ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  //   orderedAllCats() {
  //     return orderBy(this.allCategories);
  //   },
  // },
  mounted() {
    // this.queryCategories();
    this.loadSiteSettings();
    this.loadRedirects();
  },
  methods: {
    ...mapActions('whppt-nuxt/site', ['saveSiteSettings', 'publishSiteSettings', 'publishNav', 'publishFooter']),
    pubNav() {
      this.publishNav();
    },
    pubFooter() {
      this.publishFooter();
    },
    // saveCat(category) {
    //   const newCat = {
    //     name: category.name,
    //     _id: category._id,
    //     filters: map(category.filters, filter => {
    //       return filter.value.split(',');
    //     }),
    //   };
    //   return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveCategory`, { category: newCat }).then(() => {
    //     this.queryCategories();
    //     this.$toast.global.editorSuccess('Category Saved');
    //   });
    // },
    // publishCat(category) {
    //   const newCat = {
    //     name: category.name,
    //     _id: category._id,
    //     filters: map(category.filters, filter => {
    //       return filter.value.split(',');
    //     }),
    //   };
    //   const vm = this;
    //   return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/publishCategory`, { category: newCat }).then(() => {
    //     category.published = true;
    //     vm.$toast.global.editorSuccess('Category Published');
    //   });
    // },
    // unpublishCat(category) {
    //   if (!category.published) return this.$toast.global.editorError("Category isn't published");
    //   const vm = this;
    //   return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/unpublishCategory`, { _id: category._id }).then(() => {
    //     category.published = false;
    //     vm.$toast.global.editorSuccess('Category Unpublished');
    //   });
    // },
    // deleteCat(_id) {
    //   return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/deleteCategory`, { _id }).then(() => {
    //     this.queryCategories();
    //   });
    // },
    // queryCategories() {
    //   return Promise.all([
    //     this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`),
    //     this.$axios.get(`${this.baseAPIUrl}/api/listing/fetchCategories`),
    //   ]).then(([{ data }, { data: categories }]) => {
    //     this.allCategories = categories;
    //     this.loadedCategories = data;
    //     this.formatCategories();
    //   });
    // },
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
    sliceRedirects() {
      this.pages = Math.ceil(this.redirects.length / this.limit);
      if (this.currentPage >= this.pages) this.currentPage = this.pages - 1;
      this.slicedRedirects = this.redirects.slice(
        this.currentPage * this.limit,
        this.currentPage * this.limit + this.limit
      );
    },
    loadRedirects() {
      const vm = this;
      return this.$axios.get(`${vm.baseAPIUrl}/api/siteSettings/loadRedirects`).then(({ data: redirects }) => {
        if (!redirects || !redirects.length) return;
        vm.redirects = redirects;
        vm.sliceRedirects();
      });
    },
    deleteRedirect(redirect) {
      if (redirect.published) return this.$toast.global.editorError('Redirect has to be unpublished first');
      const vm = this;
      return this.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/deleteRedirect`, { _id: redirect._id }).then(() => {
        vm.redirects = remove(vm.redirects, r => r._id !== redirect._id);
        vm.sliceRedirects();
      });
    },
    swapPage(newPage) {
      this.currentPage = newPage;
      this.sliceRedirects();
    },
    addedRedirect(newRedirect) {
      this.loadRedirects();
    },
    // selectCat(category, index) {
    //   this.selectedCat = category;
    //   this.selectedIndex = index;
    // },
    // formatCategories() {
    //   this.categories = map(this.loadedCategories, category => {
    //     return {
    //       ...category,
    //       filters: map(category.filters, filter => {
    //         return {
    //           value: filter.join(','),
    //         };
    //       }),
    //     };
    //   });
    // },
    // addCategory() {
    //   let newCat = { name: `New Category ${this.categories.length + 1}`, filters: [{ value: '' }] };
    //   newCat = {
    //     name: newCat.name,
    //     _id: newCat._id,
    //     filters: map(newCat.filters, filter => {
    //       return filter.value.split(',');
    //     }),
    //   };
    //   return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveCategory`, { category: newCat }).then(() => {
    //     this.queryCategories();
    //     this.$toast.global.editorSuccess('Category Added');
    //   });
    // },
    // addOrFilter() {
    //   this.selectedCat.filters.push({ value: '' });
    // },
    // removeFromList(index) {
    //   this.categories.splice(index, 1);
    // },
    // removeFilter(filterIndex) {
    //   this.selectedCat.filters.splice(filterIndex, 1);
    // },
    // closeWarning() {
    //   this.showWarning = false;
    //   this.usedListings = [];
    // },
    // openWarning(category) {
    //   if (category.published) return this.$toast.global.editorError('Category has to be unpublished first');
    //
    //   this.selectedCat = this.selectedCat || category;
    //   if (!this.selectedCat._id) {
    //     this.removeFromList(this.selectedIndex);
    //     this.selectedCat = undefined;
    //     this.selectedIndex = undefined;
    //   } else {
    //     return this.$axios
    //       .post(`${this.baseAPIUrl}/api/siteSettings/getWarningInfo`, { _id: this.selectedCat._id })
    //       .then(({ data }) => {
    //         this.usedListings = data;
    //         this.showWarning = true;
    //       });
    //   }
    // },
    // removeCategory() {
    //   const vm = this;
    //   return vm.$axios
    //     .post(`${vm.baseAPIUrl}/api/siteSettings/deleteCategory`, { _id: vm.selectedCat._id })
    //     .then(() => {
    //       vm.categories = remove(vm.categories, c => c._id !== vm.selectedCat._id);
    //       vm.showWarning = false;
    //       vm.selectedCat = undefined;
    //       vm.selectedIndex = undefined;
    //     });
    // },
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
      }).then(() => {
        this.queryCategories();
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
