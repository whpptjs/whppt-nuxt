<template>
  <div class="whppt-full">
    <h1>Add Content</h1>
    <whppt-button
      v-for="component in components"
      :key="component.key"
      class="whppt-full content--margin"
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
      this.$whppt.editData.push(JSON.parse(JSON.stringify(content)));
    },
  },
};
</script>

<style scoped>
.content--margin {
  margin: 0.2rem 0;
}
</style>
