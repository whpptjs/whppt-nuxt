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
    ...mapState('whppt-nuxt/editor', ['selectedContent', 'selectedComponent', 'selectedContentFilter']),
    filterList() {
      return this.selectedContent && this.selectedContentFilter;
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
      const index = this.selectedIndex();
      const item = JSON.parse(JSON.stringify({ ...content, marginTop: '', inContainer: false }));
      this.selectedContent.splice(index + 1, 0, item);
    },
    selectedIndex() {
      return this.selectedContent.indexOf(this.selectedComponent.value);
    },
  },
};
</script>

<style scoped>
.whppt-content--margin {
  margin: 0.2rem 0;
}
</style>
