<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <div v-if="isDraft">
      <editor-menu></editor-menu>
      <whppt-modal :is-active="editInModal" @closeModal="closeModal">
        <template v-slot:content>
          <component :is="editInModalType" :prefix="prefix" @closeModal="closeModal" />
        </template>
      </whppt-modal>
    </div>
    <div class="whppt-content" @mouseenter="previewImage = ''">
      <slot></slot>
    </div>
    <preview-sidebar :preview-image="previewImage" />
    <whppt-sidebar @changePreview="setPreview" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as Editors from '../system';
import SlugSettings from '../system/SlugSettings';
import PublishSettings from '../system/PublishSettings';
import WhpptModal from '../whpptComponents/WhpptModal';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptCheckBox from '../whpptComponents/CheckBox';
import ContentsTree from '../whpptComponents/ContentsTree';
import WhpptTab from '../whpptComponents/WhpptTab';
import WhpptButton from '../whpptComponents/WhpptButton';
import WhpptTabs from '../whpptComponents/WhpptTabs';

export default {
  name: 'WhpptEditorApp',
  components: {
    ...Editors,
    SiteSettings: () => import('../system/SiteSettings'),
    PageSettings: () => import('../system/PageSettings'),
    WhpptSidebar: () => import('../system/WhpptSidebar'),
    PreviewSidebar: () => import('../system/PreviewSidebar'),
    WhpptButton,
    WhpptModal,
    WhpptTextInput,
    SlugSettings,
    PublishSettings,
    WhpptCheckBox,
    ContentsTree,
    WhpptTab,
    WhpptTabs,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({ previewImage: '' }),
  computed: {
    ...mapState('whppt-nuxt/editor', [
      'editInModal',
      'editInModalType',
      'editSidebar',
      'editSidebarType',
      'editData',
      'selectedComponent',
      'selectedContent',
      'draft',
    ]),
    isDraft() {
      return this.draft;
    },
  },

  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
    ifExists(value) {
      return typeof value !== 'undefined';
    },
    setPreview(previewImage) {
      this.previewImage = previewImage;
    },
  },
};
</script>

<style>
.whppt-button__close {
  margin-top: 10px !important;
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
  min-height: 100vh;
}

.whppt-sidebar__inner {
  width: 365px;
  position: fixed;
  overflow: auto;
  height: 100vh;
  padding-bottom: 60px;
}

.whppt-openEditor {
  margin-right: 0;
}

.preview-sidebar {
  position: absolute;
  right: 400px;
  color: white;
  padding: 1rem;
  width: 600px;
  min-width: 600px;
  margin-right: -600px;
  transition: 0.5s;
  z-index: 51;
  min-height: 100vh;
}

.preview-sidebar__inner {
  width: 565px;
  position: fixed;
  overflow: auto;
  height: 100vh;
  padding-bottom: 60px;
}
.preview-sidebar__inner .preview-image {
  width: 565px;
}

.preview-openEditor {
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

.whppt-flex-start {
  display: flex;
  justify-content: flex-start;
}

.whppt-flex-end {
  display: flex;
  justify-content: flex-end;
}

.whppt-align-center {
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
  /*outline-offset: -2px;*/
}

.whppt__content--active {
  outline: 2px solid orange;
}

.whppt__component--hover {
  outline: 2px solid blue;
  /*outline-offset: -2px;*/
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

.whppt__default-container {
  display: grid;
}
</style>
