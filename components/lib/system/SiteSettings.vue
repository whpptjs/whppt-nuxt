<template>
  <div class=" w-3/4">
    <div class="whppt-settings">
      <div v-if="!showWarning" class="whppt-settings__content">
        <div class="whppt-settings__heading">
          <h1>Site Settings</h1>
          <button class="whppt-settings-button" @click="saveCategories">Save</button>
        </div>
        <form @submit.prevent>
          <div>
            <fieldset>
              <div class="whppt-flex-between whppt-align-center">
                <label for="name">Listing Categories</label>
                <!-- <button class="whppt-icon" @click="addCategory">
                <w-add-circle></w-add-circle>
              </button> -->
                <button class="whppt-settings-button" @click="addCategory">Add New Category</button>
              </div>
              <div class="flex w-full">
                <div v-if="!selectedCat" class="flex-1">
                  <div v-for="(category, index) in categories" :key="index" class="whppt-category flex-1">
                    <div class="mb-2" @click="selectedCat = category">
                      {{ category.name }}
                    </div>
                  </div>
                </div>

                <div v-if="selectedCat" class="whppt-category flex-1">
                  <div @click="selectedCat = undefined">
                    close
                  </div>
                  <div>
                    <label for="name">Category: </label>
                    <div class="whppt-flex-between whppt-align-center">
                      <whppt-text-input v-model="selectedCat.name" placeholder="Enter category name" label="Name" />
                      <button class="whppt-icon ml-auto" @click="openWarning(selectedCat.id, index)">
                        <w-remove></w-remove>
                      </button>
                    </div>

                    <label>Filters: </label>
                    <div class="whppt-flex-start whppt-align-center flex-wrap">
                      <div v-for="(filter, filterIndex) in selectedCat.filters" :key="filterIndex">
                        <div class="whppt-flex-start whppt-align-center ">
                          <div>
                            <button
                              class="whppt-icon ml-auto"
                              :class="selectedCat.filters.length <= 1 ? 'cursor-default' : ''"
                              @click="selectedCat.filters.length > 1 ? removeFilter(filterIndex) : ''"
                            >
                              <w-remove :class="selectedCat.filters.length <= 1 ? 'text-gray-500' : ''"></w-remove>
                            </button>
                            <whppt-text-input
                              v-model="filter.value"
                              placeholder="Enter categories to filter by"
                              info="event, restaurant, etc."
                            />
                          </div>
                          <label v-if="filterIndex < selectedCat.filters.length - 1" class="text-gray-500 mr-4 ml-4">{{
                            '(AND)'
                          }}</label>
                        </div>
                      </div>
                      <button class="whppt-icon ml-4" @click="addOrFilter()">
                        <w-add-circle></w-add-circle>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="whppt-category">
                  <div class="font-bold ">
                    Tag category fields
                  </div>
                  <div class="overflow-auto" style="max-height: 500px;">
                    <div v-for="cat in orderedAllCats" :key="cat">{{ cat }}</div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
      <div v-if="showWarning" class="whppt-settings__content">
        <div class="whppt-settings__heading">
          <h1>Site Settings</h1>
        </div>
        <div v-if="usedListings && usedListings.length" class="text-center">
          <p>
            WARNING
          </p>
          <p>This category is currently being used on {{ usedListings && usedListings.length }} page(s)</p>
          <p>
            You will need to remove this category from use to delete it
          </p>
          <p class="text-gray-700 italic pt-8">
            These pages are:
          </p>

          <div v-for="(page, index) in usedListings" :key="index" class="text-gray-700 italic">
            {{ page }}
          </div>
          <button class="whppt-warning-button mt-8" @click="closeWarning()">Ok</button>
        </div>
        <div v-else class="text-center">
          <p>
            WARNING
          </p>
          <p>
            This action will delete this category permanently, are you sure?
          </p>
          <div class="align-center">
            <button class="whppt-warning-button mt-8 mr-4" @click="removeCategory()">Yes</button>
            <button class="whppt-warning-button mt-8 ml-4" @click="closeWarning()">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { map, remove, orderBy } from 'lodash';
import { mapState } from 'vuex';

import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'WhpptSiteSettings',
  components: { WhpptTextInput },
  data() {
    return {
      loadedCategories: [],
      categories: [],
      allCategories: [],
      baseAPIUrl: '',
      showWarning: false,
      selectedCat: undefined,
      usedListings: [],
      warningId: undefined,
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    orderedAllCats() {
      return orderBy(this.allCategories);
    },
  },
  mounted() {
    return Promise.all([
      this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`),
      this.$axios.get(`${this.baseAPIUrl}/api/listing/fetchCategories`),
    ]).then(([{ data }, { data: categories }]) => {
      this.allCategories = categories;
      this.loadedCategories = data;
      this.formatCategories();
    });
  },
  methods: {
    formatCategories() {
      this.categories = map(this.loadedCategories, category => {
        return {
          name: category.name,
          id: category.id,
          filters: map(category.filters, filter => {
            return {
              value: filter.join(','),
            };
          }),
        };
      });
    },
    addCategory() {
      this.categories.push({ name: `New Category ${this.categories.length + 1}`, filters: [{ value: '' }] });
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
      this.warningId = undefined;
    },
    openWarning(id, index) {
      this.warningId = id;
      if (!this.warningId) {
        this.removeFromList(index);
      } else {
        return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/getWarningInfo`, { id }).then(({ data }) => {
          console.log('TCL: openWarning -> data', data);
          this.usedListings = data;
          this.showWarning = true;
        });
      }
    },
    removeCategory() {
      return this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/deleteCategory`, { id: this.warningId }).then(() => {
        this.categories = remove(this.categories, c => c.id !== this.warningId);
        this.showWarning = false;
        this.warningId = undefined;
      });
    },
    saveCategories() {
      const formattedCategories = map(this.categories, category => {
        return {
          name: category.name,
          id: category.id,
          filters: map(category.filters, filter => {
            return filter.value.split(',');
          }),
        };
      });
      this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveCategories`, { categories: formattedCategories });
    },
  },
};
</script>

<style>
.whppt-settings {
  color: black;
  display: flex;
  z-index: 52;
  width: 100%;
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

.whppt-category {
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
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
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 4rem;
}

.whppt-settings__content form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
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

.whppt-settings-button {
  margin-left: auto;
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  background-color: black;
  border-radius: 25px;
}

.whppt-warning-button {
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
</style>
