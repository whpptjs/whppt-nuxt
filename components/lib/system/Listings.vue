<template>
  <div class="whppt-full ">
    <h1>Listings</h1>
    <p>Categories</p>
    <div v-for="(category, index) in options" :key="index">
      <whppt-check-box
        :value="categories && categories.indexOf(category.key) !== -1"
        :label="category.namespace"
        @click="modifyFilters(category.key)"
      ></whppt-check-box>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptCheckBox from '../whpptComponents/CheckBox';

export default {
  name: 'EditorListings',
  components: { WhpptCheckBox },
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
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    categories() {
      return this.selectedComponent.value[this.selectedComponent.property];
    },
  },
  methods: {
    modifyFilters(category) {
      if (!this.categories) {
        this.selectedComponent.value[this.selectedComponent.property] = [category];
        return;
      }
      const index = this.selectedComponent.value[this.selectedComponent.property].indexOf(category);
      if (index === -1) this.selectedComponent.value[this.selectedComponent.property].push(category);
      else this.selectedComponent.value[this.selectedComponent.property].splice(index, 1);
    },
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
