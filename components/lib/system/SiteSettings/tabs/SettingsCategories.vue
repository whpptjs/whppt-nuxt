<template>
  <div v-if="showWarning" class="whppt-settings__content">
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
  <form v-else @submit.prevent>
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
                <div
                  class="whppt-settings__tooltip whppt-redirects__icon"
                  style="position: relative"
                  @click.stop="saveCat(category)"
                >
                  <span class="whppt-settings__tooltip-text">Save</span>
                  <w-save></w-save>
                </div>
                <div class="whppt-settings__tooltip whppt-redirects__icon" @click.stop="publishCat(category)">
                  <span class="whppt-settings__tooltip-text">Publish</span>
                  <w-publish></w-publish>
                </div>
                <div class="whppt-settings__tooltip whppt-redirects__icon" @click.stop="unpublishCat(category)">
                  <span class="whppt-settings__tooltip-text">Unpublish</span>
                  <w-close></w-close>
                </div>
                <div class="whppt-settings__tooltip whppt-redirects__icon" @click.stop="openWarning(category)">
                  <span class="whppt-settings__tooltip-text">Delete</span>
                  <w-remove></w-remove>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedCat" class="whppt-settings__category" style="width: 75%;">
            <div class="whppt-flex-between whppt-align-center">
              <label for="name">Category: </label>
              <div style="display: flex">
                <div class="whppt-redirects__icon" @click.stop="saveCat(selectedCat)">
                  <w-save></w-save>
                </div>
                <div class="whppt-redirects__icon" @click.stop="selectedCat = undefined">
                  <w-close></w-close>
                </div>
              </div>
            </div>
            <div>
              <whppt-text-input
                v-model="selectedCat.name"
                label-colour="black"
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

            <div class="whppt-select__frequency-label">Show Dates Filters?</div>
            <select v-model="selectedCat.hasDates" class="whppt-select__frequency-input">
              <option :value="false">
                No
              </option>
              <option :value="true">
                Yes
              </option>
            </select>
            <div class="whppt-select__frequency-info">
              Select yes if the listings in this category have important dates (such as events). This will allow users
              to filter these listings by date.
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
</template>

<script>
import { map, orderBy, remove } from 'lodash';
import { mapState } from 'vuex';
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';

export default {
  name: 'SettingsTwitter',
  components: { WhpptTextInput },
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    loadedCategories: [],
    categories: [],
    allCategories: [],
    showWarning: false,
    selectedCat: undefined,
    selectedIndex: undefined,
    usedListings: [],
    warningId: undefined,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    orderedAllCats() {
      return orderBy(this.allCategories);
    },
  },
  mounted() {
    this.queryCategories();
  },
  methods: {
    saveCat(category) {
      const newCat = {
        name: category.name,
        _id: category._id,
        hasDates: category.hasDates,
        filters: map(category.filters, filter => {
          return filter.value.split(',');
        }),
      };
      return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveCategory`, { category: newCat }).then(() => {
        this.queryCategories();
        this.$toast.global.editorSuccess('Category Saved');
      });
    },
    publishCat(category) {
      const newCat = {
        name: category.name,
        _id: category._id,
        filters: map(category.filters, filter => {
          return filter.value.split(',');
        }),
      };
      const vm = this;
      return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/publishCategory`, { category: newCat }).then(() => {
        category.published = true;
        vm.$toast.global.editorSuccess('Category Published');
      });
    },
    unpublishCat(category) {
      if (!category.published) return this.$toast.global.editorError("Category isn't published");
      const vm = this;
      return vm.$axios.post(`${vm.baseAPIUrl}/api/siteSettings/unpublishCategory`, { _id: category._id }).then(() => {
        category.published = false;
        vm.$toast.global.editorSuccess('Category Unpublished');
      });
    },
    deleteCat(_id) {
      return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/deleteCategory`, { _id }).then(() => {
        this.queryCategories();
      });
    },
    queryCategories() {
      return Promise.all([
        this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`),
        this.$axios.get(`${this.baseAPIUrl}/api/listing/fetchCategories`),
      ]).then(([{ data }, { data: categories }]) => {
        this.allCategories = categories;
        this.loadedCategories = data;
        this.formatCategories();
      });
    },
    selectCat(category, index) {
      this.selectedCat = category;
      this.selectedIndex = index;
    },
    formatCategories() {
      this.categories = map(this.loadedCategories, category => {
        return {
          ...category,
          filters: map(category.filters, filter => {
            return {
              value: filter.join(','),
            };
          }),
        };
      });
    },
    addCategory() {
      let newCat = { name: `New Category ${this.categories.length + 1}`, filters: [{ value: '' }] };
      newCat = {
        name: newCat.name,
        _id: newCat._id,
        hasDates: false,
        filters: map(newCat.filters, filter => {
          return filter.value.split(',');
        }),
      };
      return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveCategory`, { category: newCat }).then(() => {
        this.queryCategories();
        this.$toast.global.editorSuccess('Category Added');
      });
    },
    removeCategory() {
      const vm = this;
      return vm.$axios
        .post(`${vm.baseAPIUrl}/api/siteSettings/deleteCategory`, { _id: vm.selectedCat._id })
        .then(() => {
          vm.categories = remove(vm.categories, c => c._id !== vm.selectedCat._id);
          vm.showWarning = false;
          vm.selectedCat = undefined;
          vm.selectedIndex = undefined;
        });
    },
    addOrFilter() {
      this.selectedCat.filters.push({ value: '' });
    },
    removeFromList(index) {
      this.categories.splice(index, 1);
    },
    removeFilter(filterIndex) {
      this.selectedCat.filters.splice(filterIndex, 1);
    },
    closeWarning() {
      this.showWarning = false;
      this.usedListings = [];
    },
    openWarning(category) {
      if (category.published) return this.$toast.global.editorError('Category has to be unpublished first');

      this.selectedCat = this.selectedCat || category;
      if (!this.selectedCat._id) {
        this.removeFromList(this.selectedIndex);
        this.selectedCat = undefined;
        this.selectedIndex = undefined;
      } else {
        return this.$axios
          .post(`${this.baseAPIUrl}/api/siteSettings/getWarningInfo`, { _id: this.selectedCat._id })
          .then(({ data }) => {
            this.usedListings = data;
            this.showWarning = true;
          });
      }
    },
  },
};
</script>
