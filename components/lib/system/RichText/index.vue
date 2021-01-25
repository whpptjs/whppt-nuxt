<template>
  <div class="whppt-editor">
    <p class="font-xl whppt-editor__header">Rich Text Editor</p>
    <rich-text-editor
      :hide-menu="selectedComponent.hideMenu"
      :hide-style="selectedComponent.hideStyle"
      :hide-headers="selectedComponent.hideHeaders"
      :hide-lists="selectedComponent.hideLists"
      :hide-links="selectedComponent.hideLinks"
      :selected-value="selectedComponent.value"
      :selected-property="selectedComponent.property"
    ></rich-text-editor>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RichTextEditor from './RichTextEditor';

export default {
  name: 'WhpptRichText',
  components: {
    RichTextEditor,
  },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>

<style>
.whppt-editor {
  width: 100%;
  color: white;
}

.whppt-editor .has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #3ea4ffe6;
}

.whppt-menubar {
  display: flex;
  align-items: center;
  padding: 0.2em 0.2em 0.2em 15px;
  border: 1px solid white;
  color: white;
  background: #222;
}

.whppt-menubar--active {
  color: orangered !important;
}
.whppt-menubar__close-button {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  color: black;
  font: 12px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  background-color: linen;
  border-color: linen;
  cursor: pointer;
}

.whppt-menubar__section {
  display: flex;
}

.whppt-menubar button {
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.whppt-menubar__section-container {
  display: flex;
  align-items: center;
}

.whppt-editor .ProseMirror {
  margin: 1em 0;
  border: 1px solid white;
  min-height: 400px;
  padding: 1em;
  height: 60vh;
  overflow-y: scroll;
}

.whppt-editor__header {
  margin-bottom: 5px;
}

/* .whppt-rich-content p:not(:first-child) {
  padding-top: 2rem;
} */
.whppt-menubar__link-form {
  border: 1px solid white;
  padding: 1rem;
}

.whppt-menubar__input {
  width: 45%;
  background: transparent;
}

.whppt-rich-content p:not(:first-child),
.whppt-rich-content h2:not(:first-child) {
  padding-top: 2rem;
}

.whppt-rich-content a {
  text-decoration: underline;
}

.whppt-rich-content h3:not(:first-child),
.whppt-rich-content ol:not(:first-child),
.whppt-rich-content ul:not(:first-child) {
  padding-top: 1rem;
}

.whppt-rich-content ol {
  list-style-position: inside;
  list-style-type: decimal;
}
.whppt-rich-content ul {
  list-style-position: inside;
  list-style-type: disc;
}

.whppt-rich-content ul p,
.whppt-rich-content ol p {
  padding-top: 0rem;
  display: inline;
}

.whppt-rich-content h1 {
  @apply text-4xl;
}

.whppt-rich-content h2 {
  @apply text-2xl;
}

.whppt-rich-content h3 {
  @apply text-lg;
}
</style>
