<template>
  <div class="whppt-flex">
    <editor-menu></editor-menu>
    <div class="whppt-content"><slot> </slot></div>
    <div class="whppt-sidebar" :class="{ 'whppt-openEditor': editSidebar }">
      <component :is="editSidebarType"></component>
      <button class="whppt-button whppt-button__close" @click="closeSidebar">
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
  computed: mapState('whppt-nuxt/editor', ['editSidebar', 'editSidebarType']),
  methods: mapMutations('whppt-nuxt/editor', ['closeSidebar']),
};
</script>

<style>
.whppt-button__close {
  margin-top: 10px;
}
.whppt-link {
  padding-bottom: 1px;
  text-decoration: none;
  color: black;
}
.whppt-button {
  display: inline-block;
  color: white;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  background-color: black;
  font-size: 1em;
  border-radius: 25px;
  cursor: pointer;
}

.whppt-button:hover {
  background-color: #eee;
  color: black;
}
.whppt-button:focus {
  outline: none;
}

.whppt-sidebar {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  width: 400px;
  margin-right: -400px;
  transition: 0.5s;
}
.whppt-openEditor {
  margin-right: 0;
}
.whppt-flex {
  height: 100vh;
  display: flex;
  background-color: gray;
  overflow-x: hidden;
}
.whppt-content {
  flex-grow: 1;
  background-color: white;
}
</style>
