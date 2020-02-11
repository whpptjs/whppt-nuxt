<template>
  <div class="whppt-settings">
    <div class="whppt-settings__content">
      <div class="whppt-settings__heading">
        <h1>Site Settings</h1>
        <button class="whppt-button" @click="saveCategories">Save</button>
      </div>
      <form @submit.prevent>
        <div class="whppt-settings__column">
          <fieldset>
            <div class="whppt-flex-between">
              <label for="name">Listing Categories</label>
              <button class="whppt-icon-button" @click="addCategory">
                <w-add-circle></w-add-circle>
              </button>
            </div>
            <div v-for="(category, index) in categories" :key="index" class="whppt-flex-between">
              <div>{{ category.namespace }}</div>
              <button class="whppt-icon-button" @click="removeCategory(index)">
                <w-remove></w-remove>
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { map } from 'lodash';
import slugify from 'slugify';

export default {
  name: 'WhpptSiteSettings',
  data() {
    return {
      categories: [],
      baseAPIUrl: '',
    };
  },
  mounted() {
    this.baseAPIUrl = this.$whppt.baseAPIUrl || '';
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`).then(({ data }) => {
      this.categories = data;
    });
  },
  methods: {
    addCategory() {
      this.categories.push({ namespace: `New Category ${this.categories.length + 1}`, key: '' });
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    saveCategories() {
      map(this.categories, c => {
        return {
          namespace: c,
          key: slugify(c, { remove: '^[a-z](-?[a-z])*$', lower: true }),
        };
      });
      console.log('TCL: saveCategories -> this.categories', this.categories);

      // this.$axios.post(`${this.baseAPIUrl}/api/siteSettings/saveCategories`, {categories: this.categories})
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

.whppt-settings button {
  margin-left: auto;
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  background-color: black;
  border-radius: 25px;
}
</style>
