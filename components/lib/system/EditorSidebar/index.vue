<template>
  <div class="flex">
    <div class="content"></div>
    <div v-if="editing" class="sidebar">
      <component :is="test"></component>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line import/no-unresolved
export default {
  name: 'WhpptEditorSidebar',
  computed: mapState('whppt-nuxt', ['editing']),
  methods: {},
};
</script>

<style scoped>
.sidebar {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  width: 400px;
}
.flex {
  display: flex;
  background-color: gray;
}
.content {
  flex-grow: 1;
  background-color: red;
}
</style>
