<template>
  <div v-if="listing" class="whppt-atdw">
    <div class="whppt-atdw__content whppt-atdw__content--left">
      <div class="whppt-atdw__heading">
        <h1>Edit Listing</h1>
        <button class="whppt-button" @click="saveListing">Save</button>
      </div>
      <form @submit.prevent>
        <fieldset>
          <label for="name">Name</label>
          <input id="name" v-model="listing.name.value" />
          ATDW: {{ listing.atdw.productName }}
        </fieldset>
        <fieldset>
          <label for="desc">Description</label>
          <textarea id="desc" v-model="listing.description.value" rows="3" />
          ATDW: {{ listing.atdw.productDescription }}
        </fieldset>
        <fieldset>
          <label for="address">Address</label>
          <input id="address" v-model="listing.address.value" />
          ATDW: {{ listing.atdw.addresses }}
        </fieldset>
        <fieldset>
          <label for="categories">Categories</label>
          <input id="categories" v-model="listing.categories" />
          ATDW: {{ listing.atdw.productCategoryId }}
        </fieldset>
      </form>
    </div>
    <div class="whppt-atdw__content whppt-atdw__content--right">
      <div class="whppt-atdw__heading">
        <h1>ATDW</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptATDW',
  data: () => ({
    listing: undefined,
  }),
  mounted() {
    this.$axios.get(`http://localhost:3001/api/listing/findById?id=56b26d16d5f1565045dae8ca`).then(({ data }) => {
      this.listing = data;
    });
  },
  methods: {
    saveListing() {
      return this.$axios.post(`http://localhost:3001/api/listing/save`, { listing: this.listing });
    },
  },
};
</script>

<style>
.whppt-atdw {
  color: black;
  display: flex;
  z-index: 52;
  width: 100%;
  height: 80vh;
  margin: 1.5rem;
}

.whppt-atdw__content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}
.whppt-atdw__content--left {
  position: relative;
  width: 66.66%;
  margin-right: 1rem;
}
.whppt-atdw__content--right {
  width: 33.33%;
}

.whppt-atdw__heading {
  position: sticky;
  background-color: white;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.whppt-atdw__content form {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.whppt-atdw__content form > fieldset {
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  border: none;
}

.whppt-atdw__content form label {
  font-size: 0.9rem;
}

.whppt-atdw__content form input,
.whppt-atdw__content form textarea {
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

.whppt-atdw button {
  margin-left: auto;
  padding: 0.8rem 2rem;
  display: inline-block;
  color: white;
  background-color: black;
  border-radius: 25px;
}

.bold {
  font-weight: bold;
}
</style>
