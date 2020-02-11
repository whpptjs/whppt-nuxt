<template>
  <div class="whppt-full ">
    <h1>Listings</h1>
    <p>Filter</p>
    <whppt-select v-model="$whppt.editData[$whppt.editDataProperty]" :items="filters" label="Category Filter" />
  </div>
</template>

<script>
import { map } from 'lodash';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'EditorListings',
  components: { WhpptSelect },
  data() {
    return {
      filters: [],
    };
  },
  mounted() {
    this.baseAPIUrl = this.$whppt.baseAPIUrl || '';
    this.$axios.get(`${this.baseAPIUrl}/api/siteSettings/loadCategories`).then(({ data }) => {
      this.filters = map(data, d => {
        return { title: d.name, id: d.id };
      });
    });
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
