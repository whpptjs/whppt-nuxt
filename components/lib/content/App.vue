<template>
  <div class="whppt-flex">
    <editor-menu></editor-menu>
    <div class="whppt-content">
      <div class="whppt-content__inner">
        <slot></slot>
      </div>
    </div>
    <div class="whppt-sidebar" :class="{ 'whppt-openEditor': editSidebar }">
      <component :is="editSidebarType"></component>
      <whppt-button class="whppt-button__close" @click="closeSidebar">
        Close
      </whppt-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import * as Editors from '../system';
import WhpptButton from '../system/WhpptButton';

export default {
  name: 'WhpptEditorSidebar',
  components: { ...Editors, WhpptButton },
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

.whppt-sidebar {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  width: 400px;
  min-width: 400px;
  margin-right: -400px;
  transition: 0.5s;
}
.whppt-openEditor {
  margin-right: 0;
}
.whppt-flex {
  height: 100vh;
  display: flex;
  overflow-x: hidden;
}
.whppt-content {
  flex-grow: 1;
  background-color: white;
}

.whppt-content__inner {
  display: block;
  position: static;
  flex: none;
}

.whppt-full {
  width: 100%;
}
.whppt-component__content--active {
  border: 2px solid palegreen;
}
.whppt-component__select--active {
  border: 2px solid orange;
}

.whppt-component__select--hover {
  border: 2px solid blue;
}

.whppt-component__edit--active {
  border: 2px solid red;
}
</style>
