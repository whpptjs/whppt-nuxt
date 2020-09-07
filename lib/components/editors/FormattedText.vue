<template>
  <div class="whppt-editor">
    <p class="font-xl whppt-editor__header">Formatted Text Editor</p>
    <editor-menu-bar v-if="!selectedComponent.hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive }" class="whppt-menubar" style="top: -52px">
        <div v-if="!selectedComponent.hideStyle" class="whppt-menubar__section">
          <button aria-label="Bold" @click="commands.bold">
            <i-bold class="whppt-editor__icon" :class="{ 'whppt-editor__icon--active': isActive.bold() }" />
          </button>
          <button aria-label="Italic" @click="commands.italic">
            <i-italic class="whppt-editor__icon" :class="{ 'whppt-editor__icon--active': isActive.italic() }" />
          </button>
          <button aria-label="Underline" @click="commands.underline">
            <i-underline class="whppt-editor__icon" :class="{ 'whppt-editor__icon--active': isActive.underline() }" />
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
import { mapActions, mapState } from 'vuex';
import IBold from '../icons/Bold';
import IItalic from '../icons/Italic';
import IUnderline from '../icons/Underline';

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
  computed: {
    ...mapState('whppt-nuxt/editor', ['formattedTextWatcher', 'selectedComponent']),
  },
  watch: {
    formattedTextWatcher() {
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
        vm.setSelectedComponentState({ value: getHTML(), path: vm.selectedComponent.property });
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$primary-600: #5a67d8;

.whppt-editor {
  width: 100%;

  &__icon {
    color: black;
  }

  &__icon--active {
    color: $primary-600;
  }
}

.whppt-menubar {
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
  border: 1px solid $gray-200;
  border-radius: 0.25rem;
}

.whppt-menubar__section {
  display: flex;
}

.whppt-menubar button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
}

.whppt-menubar__section-container {
  display: flex;
  align-items: center;
}

.whppt-formatted-content p:not(:first-child) {
  padding-top: 2rem;
}
</style>

<style lang="scss">
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$primary-600: #5a67d8;

.whppt-editor .ProseMirror {
  margin: 1em 0;
  padding: 1rem 2rem 1rem 0.75rem;
  border: 1px solid $gray-200;
  border-radius: 0.25rem;
  background-color: $gray-200;
  color: $gray-700;
  height: 60vh;
  min-height: 400px;
  overflow-y: auto;
  line-height: 1.25;

  &:focus {
    outline: none;
    background-color: white;
    border-color: $gray-500;
  }

  a {
    color: $primary-600;
  }
}
</style>
