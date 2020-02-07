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
import { filter, find } from 'lodash';
import { components } from './components';
import WhpptButton from './WhpptButton';

export default {
  name: 'WhpptContent',
  components: { WhpptButton },
  data() {
    return { components };
  },
  computed: {
    componentList() {
      const list = this.$whppt.components ? [...this.components, ...this.$whppt.components] : this.components;
      console.log('THIS.$WHPPT', this.$whppt);
      if (!this.$whppt.editComponentList) return list;
      console.log('CONDITION PASSED');
      const componentList = this.$whppt.editComponentList;
      return filter(list, l => find(componentList, cl => cl === l.displayType));
    },
  },
  methods: {
    addContent(content) {
      this.$whppt.editData.push(JSON.parse(JSON.stringify(content)));
    },
  },
};
</script>

<style scoped>
.whppt-content--margin {
  margin: 0.2rem 0;
}
</style>
