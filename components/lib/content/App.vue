<template>
  <div class="flex">
    <editor-menu></editor-menu>
    <div class="content"><slot> </slot></div>
    <div class="sidebar" :class="{ openEditor: editSidebar }">
      <component :is="editSidebarType"></component>
      <button @click="closeSidebar">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import * as Editors from '../system';

export default {
  name: 'WhpptEditorSidebar',
  components: { ...Editors },
  computed: mapState('whppt-nuxt', ['editSidebar', 'editSidebarType']),
  methods: mapMutations('whppt-nuxt', ['closeSidebar']),
};
</script>

<style scoped>
.sidebar {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  width: 400px;
  margin-right: -400px;
  transition: 0.5s;
}
.openEditor {
  margin-right: 0;
}
.flex {
  height: 100vh;
  display: flex;
  background-color: gray;
  overflow-x: hidden;
}
.content {
  flex-grow: 1;
  background-color: white;
}
</style>
