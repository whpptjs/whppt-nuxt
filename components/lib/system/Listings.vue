<template>
  <div class="whppt-full ">
    <h1>Listings</h1>
    <p>Categories</p>
    <div v-for="(category, index) in options" :key="index">
      <whppt-check-box
        :value="categories.indexOf(category.key) !== -1"
        :label="category.namespace"
        @click="modifyFilters(category.key)"
      ></whppt-check-box>
    </div>
    <whppt-text-input
      type="number"
      min="0"
      v-model="$whppt.editData.marginTop"
      placeholder="Height in px"
      label="Margin Top"
    />
  </div>
</template>

<script>
import WhpptCheckBox from './CheckBox';
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'EditorListings',
  components: { WhpptCheckBox, WhpptTextInput },
  data() {
    return {
      options: {
        ACCOMM: { key: 'ACCOMM', namespace: 'stay' },
        TOUR: { key: 'TOUR', namespace: 'tours' },
        EVENT: { key: 'EVENT', namespace: 'events' },
        ATTRACTION: { key: 'ATTRACTION', namespace: 'attractions' },
        RESTAURANT: { key: 'RESTAURANT', namespace: 'food' },
        HIRE: { key: 'HIRE', namespace: 'hire' },
        TRANSPORT: { key: 'TRANSPORT', namespace: 'transport' },
        DESTINFO: { key: 'DESTINFO', namespace: 'destinations' },
        GENSERVICE: { key: 'GENSERVICE', namespace: 'services' },
        INFO: { key: 'INFO', namespace: 'info' },
      },
    };
  },
  computed: {
    categories() {
      return this.$whppt.editData[this.$whppt.editDataProperty];
    },
  },
  methods: {
    modifyFilters(category) {
      const index = this.categories.indexOf(category);
      if (index === -1) this.categories.push(category);
      else this.categories.splice(index, 1);
    },
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
