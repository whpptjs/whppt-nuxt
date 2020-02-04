<template>
  <div class="whppt-full">
    <h1>Add Content</h1>
    <whppt-button
      v-for="component in components"
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
      console.log('THIS.$WHPPT.EDITDATA', this.$whppt.editData);
      console.log('THIS.$WHPPT.EDITDATAPROPERTY', this.$whppt.editDataProperty);
      this.$whppt.editData[this.$whppt.editDataProperty].push(JSON.parse(JSON.stringify(content)));
    },
  },
};
</script>

<style scoped>
.whppt-content--margin {
  margin: 0.2rem 0;
}
</style>
