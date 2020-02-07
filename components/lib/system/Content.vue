<template>
  <div class="whppt-full">
    <h1>Add Content</h1>
    <whppt-button
      v-for="component in componentList"
      :key="component.key"
      class="whppt-full whppt-content--margin"
      @click="addContent(component)"
      >{{ component.value }}</whppt-button
    >
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import { components } from './components';
import WhpptButton from './WhpptButton';

export default {
  name: 'WhpptContent',
  components: { WhpptButton },
  data() {
    return { components };
  },
  methods: {
    addContent(content) {
      this.$whppt.editData.push(JSON.parse(JSON.stringify({ ...content, marginTop: '5' })));
    },
  },
  computed: {
    componentList() {
      return this.$whppt.components ? [...this.components, ...this.$whppt.components] : this.components;
    },
  },
};
</script>

<style scoped>
.whppt-content--margin {
  margin: 0.2rem 0;
}
</style>
