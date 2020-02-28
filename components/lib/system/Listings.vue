<template>
  <div class="whppt-full">
    <p class="font-xl">Listings</p>
    <p>Filter</p>
    <whppt-select
      v-model="selectedComponent.value[selectedComponent.property]"
      :items="filters"
      label="Category Filter"
      :value="selectedComponent.value[selectedComponent.property]"
      class="whppt-mb-0"
    />
    <p class="whppt-listings__selection-container">
      Currently set to:
      {{
        selectedComponent.value[selectedComponent.property]
          ? selectedComponent.value[selectedComponent.property].title
          : 'None'
      }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { map } from 'lodash';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'EditorListings',
  components: { WhpptSelect },
  data() {
    return {
      filters: [],
      selected: undefined,
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'selectedComponent']),
  },
  mounted() {
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`).then(({ data }) => {
      this.filters = map(data, d => {
        return { title: d.name, _id: d._id };
      });
      this.filters.push({ title: 'None', _id: 'none' });
    });
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}

.whppt-mb-0 {
  margin-bottom: 0;
}

.whppt-listings__selection-container {
  color: lightgray;
  font-style: italic;
  margin-bottom: 1rem;
}
</style>
