<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <editor-menu></editor-menu>
    <modal :is-active="editInModal" @closeModal="closeModal">
      <template v-slot:content>
        <component :is="editInModalType" />
      </template>
    </modal>
    <div class="whppt-content">
      <slot></slot>
    </div>
    <div class="whppt-sidebar" :class="{ 'whppt-openEditor': editSidebar }">
      <div class="whppt-sidebar__inner">
        <component :is="editSidebarType"></component>
        <whppt-text-input
          v-if="selectedComponent && selectedComponent.value"
          v-model="selectedComponent.value.marginTop"
          type="number"
          min="0"
          :placeholder="$whppt.defaultMarginTop"
          label="Margin Top"
          class="marin-top-input"
        />
        <whppt-button class="whppt-button__close" @click="closeSidebar">
          Close
        </whppt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as Editors from '../system';
import Modal from '../system/Modal';
import SiteSettings from '../system/SiteSettings';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptButton from '../whpptComponents/WhpptButton';

export default {
  name: 'WhpptEditorApp',
  components: { ...Editors, WhpptButton, Modal, WhpptTextInput, SiteSettings },
  computed: mapState('whppt-nuxt/editor', [
    'editInModal',
    'editInModalType',
    'editSidebar',
    'editSidebarType',
    'editData',
    'selectedComponent',
    'selectedContent',
  ]),

  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
  },
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
  z-index: 51;
  min-height: 400px;
}
.whppt-sidebar__inner {
  width: 365px;
  position: fixed;
}

.whppt-sidebar__inner {
  width: 365px;
  position: fixed;
}

.whppt-openEditor {
  margin-right: 0;
}

.whppt-flex {
  display: flex;
  height: 100%;
}

.whppt-overflow-hidden {
  overflow-x: hidden;
}

.whppt-flex-between {
  display: flex;
  justify-content: space-between;
}

.whppt-align-between {
  align-items: center;
}

.whppt-content {
  width: 75%;
  flex-grow: 1;
  background-color: white;
}

.whppt-full {
  width: 100%;
}

.whppt__component--active {
  outline: 2px solid palegreen;
}

.whppt__content--active {
  outline: 2px solid orange;
}

.whppt__component--hover {
  outline: 2px solid blue;
}

.whppt__content--hover {
  outline: 2px solid red;
}

.whppt-header {
  margin-bottom: 10px;
}

.whppt-fieldset {
  border: 0;
  padding: 0;
  margin: 1rem 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.whppt-fieldset select {
  height: 30px;
  width: 100%;
  margin-top: 10px;
  color: black;
}

.whppt-icon-button {
  padding: 0;
  background-color: transparent;
  color: white;
  border: 0;
  cursor: pointer;
}
:focus {
  outline: none;
}
</style>
