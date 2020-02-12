<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <div class="whppt-settings__heading">
        <h1>Site Settings</h1>
        <button class="whppt-settings-button" @click="saveCategories">Save</button>
      </div>
      <form @submit.prevent>
        <div class="whppt-settings__column">
          <fieldset>
            <div class="whppt-flex-between">
              <label for="name">Listing Categories</label>
              <button class="whppt-icon" @click="addCategory">
                <w-add-circle></w-add-circle>
              </button>
            </div>
            <div v-for="(category, index) in categories" :key="index">
              <div class="whppt-flex-between whppt-align-center">
                <div>
                  <label for="name">Category</label>
                  <whppt-text-input v-model="category.name" placeholder="Enter category name" label="Name" />
                </div>
                <div>
                  <button class="whppt-icon" @click="addOrFilter(index)">
                    <w-add-circle></w-add-circle>
                  </button>
                  <button class="whppt-icon" @click="removeCategory(index)">
                    <w-remove></w-remove>
                  </button>
                </div>
              </div>

              <div
                v-for="(filter, filterIndex) in category.filters"
                :key="filterIndex"
                class="whppt-flex-between whppt-align-center"
              >
                <div>
                  <label for="filter">Filter</label>
                  <whppt-text-input v-model="filter.value" placeholder="Enter categories to filter by" label="Filter" />
                </div>
                <button class="whppt-icon" @click="removeFilter(index, filterIndex)">
                  <w-remove></w-remove>
                </button>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { map } from 'lodash';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'WhpptSiteSettings',
  components: { WhpptTextInput },
  data() {
    return {
      loadedCategories: [],
      categories: [],
      baseAPIUrl: '',
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`).then(({ data }) => {
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
    addOrFilter(index) {
      this.categories[index].filters.push({ value: '' });
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    removeFilter(index, filterIndex) {
      this.categories[index].filters.splice(filterIndex, 1);
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
.whppt-icon {
  margin-left: auto;
  display: inline-block;
  color: black;
}
</style>
