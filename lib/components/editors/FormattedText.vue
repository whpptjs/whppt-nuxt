<template>
  <div class="whppt-formattedtext" :class="{ 'whppt-formattedtext--dark': dark }">
    <editor-menu-bar v-if="!selectedComponent.hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive }" class="whppt-formattedtext__menubar" style="top: -52px">
        <div v-if="!selectedComponent.hideStyle" class="whppt-formattedtext__menu-section">
          <button aria-label="Bold" @click="commands.bold">
            <i-bold
              class="whppt-formattedtext__icon"
              :class="{ 'whppt-formattedtext__icon--active': isActive.bold() }"
            />
          </button>
          <button aria-label="Italic" @click="commands.italic">
            <i-italic
              class="whppt-formattedtext__icon"
              :class="{ 'whppt-formattedtext__icon--active': isActive.italic() }"
            />
          </button>
          <button aria-label="Underline" @click="commands.underline">
            <i-underline
              class="whppt-formattedtext__icon"
              :class="{ 'whppt-formattedtext__icon--active': isActive.underline() }"
            />
          </button>
        </div>
        <div class="whppt-formattedtext__menu-section">
          <button aria-label="Undo" @click="commands.undo">
            <i-undo class="whppt-formattedtext__icon" />
          </button>
          <button aria-label="Redo" @click="commands.redo">
            <i-redo class="whppt-formattedtext__icon" />
          </button>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content
      class="whppt-formattedtext__content whppt-formatted-content"
      :class="{ 'whppt-formattedtext__content--dark': dark }"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Bold, Italic, Underline, History } from 'tiptap-extensions';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { mapActions, mapState } from 'vuex';
import IBold from '../icons/Bold';
import IItalic from '../icons/Italic';
import IUndo from '../icons/Undo';
import IRedo from '../icons/Redo';
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
    IUndo,
    IRedo,
  },
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    editor: null,
    internal: undefined,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['formattedTextWatcher', 'selectedComponent']),
  },
  watch: {
    formattedTextWatcher() {
      if (this.internal !== this.selectedComponent.value[this.selectedComponent.property]) {
        this.internal = this.selectedComponent.value[this.selectedComponent.property];
        this.editor.setContent(
          isEmptyValue(this.selectedComponent.value[this.selectedComponent.property])
            ? 'Start typing here...'
            : this.selectedComponent.value[this.selectedComponent.property]
        );
      }
    },
  },
  mounted() {
    const vm = this;
    this.internal = this.selectedComponent.value[this.selectedComponent.property];

    this.editor = new Editor({
      extensions: [new Bold(), new Italic(), new Underline(), new History()],
      content: isEmptyValue(this.selectedComponent.value[this.selectedComponent.property])
        ? 'Start typing here...'
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
$gray-500: #a0aec0;
$gray-700: #4a5568;

$primary-600: #5a67d8;

.whppt-formattedtext {
  width: 100%;
  color: black;

  .whppt-formattedtext__menubar {
    background-color: white;
    border: 1px solid $gray-200;
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    border-radius: 0.25rem;
  }

  .whppt-formattedtext__menu-section {
    display: flex;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer;
      height: 2rem;
      width: 2rem;
    }
  }

  &--dark {
    color: white;

    .whppt-formattedtext__menubar {
      background-color: $gray-700;
      border: 1px solid $gray-200;
    }

    .whppt-formattedtext__menu-section {
      button {
        background-color: transparent;
      }
    }
  }

  &__icon {
    width: 1.25rem;

    &--active {
      color: $primary-600;
    }
  }
}

.whppt-link-form {
  padding: 0.5rem 0;

  .whppt-input,
  .whppt-select__field {
    margin-bottom: 0.5rem;
  }

  .whppt-link-form__buttons {
    width: 100%;
    display: flex;

    .whppt-button:not(.whppt-link-form__buttons--end) {
      margin-right: 0.5rem;
    }
  }

  .whppt-link-form__buttons--end {
    margin-left: auto;
  }
}
</style>

<style lang="scss">
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

$primary-600: #5a67d8;

.whppt-formattedtext {
  .ProseMirror {
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
    transition: background-color 0.3s ease;

    &:focus {
      outline: none;
      background-color: white;
      border-color: $gray-500;
    }

    a {
      color: $primary-600;
    }
  }

  &--dark {
    .ProseMirror {
      background-color: $gray-900;
      color: white;

      &:focus {
        background-color: $gray-700;
        border-color: $gray-200;
      }
    }
  }
}

// TODO: rename class to whppt-formattedtext__content before 2.0 release
.whppt-formatted-content {
  p:not(:first-child),
  h2:not(:first-child) {
    padding-top: 2rem;
  }

  h3:not(:first-child),
  ol:not(:first-child),
  ul:not(:first-child) {
    padding-top: 2rem;
  }

  a {
    text-decoration: underline;
  }

  ol {
    list-style-position: inside;
    list-style-type: decimal;
  }

  ul {
    list-style-position: inside;
    list-style-type: disc;
  }

  ul p,
  ol p {
    padding-top: 0;
    display: inline;
  }
}
</style>
