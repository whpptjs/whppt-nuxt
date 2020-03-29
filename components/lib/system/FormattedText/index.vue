<template>
  <div class="whppt-editor">
    <p class="font-xl whppt-editor__header">Formatted Text Editor</p>
    <editor-menu-bar v-if="!selectedComponent.hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive }" class="whppt-menubar" style="top: -52px">
        <div v-if="!selectedComponent.hideStyle" class="whppt-menubar__section">
          <button aria-label="Bold" @click="commands.bold">
            <i-bold :fill="isActive.bold() ? 'orangered' : 'white'" />
          </button>
          <button aria-label="Italic" @click="commands.italic">
            <i-italic :fill="isActive.italic() ? 'orangered' : 'white'" />
          </button>
          <button aria-label="Underline" @click="commands.underline">
            <i-underline :fill="isActive.underline() ? 'orangered' : 'white'" />
          </button>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content class="whppt-formatted-content" :editor="editor" />
  </div>
</template>

<script>
import { Bold, Italic, Underline } from 'tiptap-extensions';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { mapState } from 'vuex';
import IBold from './icons/Bold';
import IItalic from './icons/Italic';
import IUnderline from './icons/Underline';

const isEmptyValue = val => {
  return !val || val === '' || val === '<p></p>';
};

export default {
  name: 'WhpptFormattedText',
  components: {
    EditorContent,
    EditorMenuBar,
    IBold,
    IItalic,
    IUnderline,
  },
  data() {
    return {
      editor: null,
      internal: undefined,
    };
  },
  computed: mapState('whppt-nuxt/editor', ['formattedTextWatcher', 'selectedComponent']),
  watch: {
    formattedTextWatcher(val) {
      if (this.internal !== this.selectedComponent.value[this.selectedComponent.property]) {
        this.internal = this.selectedComponent.value[this.selectedComponent.property];
        this.editor.setContent(
          isEmptyValue(this.selectedComponent.value[this.selectedComponent.property])
            ? 'Start typing here '
            : this.selectedComponent.value[this.selectedComponent.property]
        );
      }
    },
  },
  mounted() {
    const vm = this;
    this.internal = this.selectedComponent.value[this.selectedComponent.property];

    this.editor = new Editor({
      extensions: [new Bold(), new Italic(), new Underline()],
      content: isEmptyValue(this.selectedComponent.value[this.selectedComponent.property])
        ? 'Start typing here '
        : this.selectedComponent.value[this.selectedComponent.property],
      onUpdate({ getHTML }) {
        vm.internal = getHTML();
        vm.selectedComponent.value[vm.selectedComponent.property] = getHTML();
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
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
</style>
