<template>
  <div class="whppt-full ">
    <h1>Listings</h1>
    <p>Filter</p>
    <whppt-select
      v-model="selectedComponent.value[selectedComponent.property]"
      :items="filters"
      label="Category Filter"
      :value="selectedComponent.value[selectedComponent.property]"
      class="mb-0"
    />
    <p class=" text-gray-700 italic mb-4">
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
import { map } from 'lodash';
import { mapState } from 'vuex';
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
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
  mounted() {
    this.baseAPIUrl = this.$whppt.baseAPIUrl || '';
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`).then(({ data }) => {
      this.filters = map(data, d => {
        return { title: d.name, id: d.id };
      });
      this.filters.push({ title: 'None', id: 'none' });
    });
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
