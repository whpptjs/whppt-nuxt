<template>
  <div class="whppt-full">
    <p class="font-xl">Add Content</p>
    <whppt-button
      v-for="component in componentList"
      :key="component.key"
      class="whppt-full whppt-content--margin"
      @click="addContent(component)"
      >{{ component.name }}</whppt-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { filter, includes } from 'lodash';
import WhpptButton from '../whpptComponents/WhpptButton';

export default {
  name: 'WhpptContent',
  components: { WhpptButton },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    contents() {
      return this.selectedComponent && this.selectedComponent.value;
    },
    filterList() {
      return this.selectedComponent && this.selectedComponent.filter;
    },
    componentList() {
      if (this.filterList) {
        return filter(this.$whppt.components, c => includes(this.filterList, c.displayType));
      }
      return this.$whppt.components;
    },
  },
  methods: {
    addContent(content) {
      this.contents.push(JSON.parse(JSON.stringify({ marginTop: '', inContainer: true, ...content })));
    },
  },
};
</script>

<style scoped>
.whppt-content--margin {
  margin: 0.2rem 0;
}
</style>
