<template>
  <div class="whppt-richtext" :class="{ 'whppt-richtext--dark': dark }">
    <editor-menu-bar v-if="!hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive, getMarkAttrs }">
        <div class="whppt-richtext__menubar" style="top: -52px">
          <div v-if="!selectedComponent.hideStyle" class="whppt-richtext__menu-section">
            <button aria-label="Bold" @click="commands.bold">
              <i-bold class="whppt-richtext__icon" :class="{ 'whppt-richtext__icon--active': isActive.bold() }" />
            </button>
            <button aria-label="Italic" @click="commands.italic">
              <i-italic class="whppt-richtext__icon" :class="{ 'whppt-richtext__icon--active': isActive.italic() }" />
            </button>
            <button aria-label="Underline" @click="commands.underline">
              <i-underline
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.underline() }"
              />
            </button>
          </div>
          <div v-if="!hideHeaders" class="whppt-richtext__menu-section">
            <button aria-label="Paragraph" @click="commands.paragraph">
              <i-paragraph
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.paragraph() }"
              />
            </button>
            <button aria-label="Header Size 2" @click="commands.heading({ level: 2 })">
              <i-header2
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.heading({ level: 2 }) }"
              />
            </button>
            <button aria-label="Header Size 3" @click="commands.heading({ level: 3 })">
              <i-header3
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.heading({ level: 3 }) }"
              />
            </button>
          </div>
          <div v-if="!hideLists" class="whppt-richtext__menu-section">
            <button aria-label="Bullet List" @click="commands.bullet_list">
              <i-bullet-list
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.bullet_list() }"
              />
            </button>
            <button aria-label="Ordered List" @click="commands.ordered_list">
              <i-ordered-list
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.ordered_list() }"
              />
            </button>
          </div>
          <div v-if="!hideLinks" class="whppt-richtext__menu-section">
            <button aria-label="Create Link" @click="showLink(getMarkAttrs('link'))">
              <i-link
                class="whppt-richtext__icon"
                :class="{ 'whppt-richtext__icon--active': isActive.link() }"
                :fill="isActive.link() ? 'orangered' : 'white'"
              />
            </button>
          </div>
          <div class="whppt-richtext__menu-section">
            <button aria-label="Undo" @click="commands.undo">
              <i-undo class="whppt-richtext__icon" />
            </button>
            <button aria-label="Redo" @click="commands.redo">
              <i-redo class="whppt-richtext__icon" />
            </button>
          </div>
        </div>

        <form v-if="editingLink" class="whppt-link-form" @submit.prevent="link(commands.link)">
          <div>
            <whppt-text-input
              id="editing-link-input"
              v-model="editingLink.href"
              label="href"
              :placeholder="editingLink.type === 'external' ? 'https://www.mysite.com.au' : '/about'"
            />
            <whppt-select
              v-model="editingLink.type"
              label="Link Type"
              class="whppt-menubar__input"
              :items="linkTypes"
            />
            <div class="whppt-link-form__buttons">
              <whppt-button @click="link(commands.link)">
                Apply
              </whppt-button>
              <whppt-button @click="removeLink(commands.link)">
                Remove
              </whppt-button>
              <whppt-button class="whppt-link-form__buttons--end" @click="closeLink()"><i-close /></whppt-button>
            </div>
          </div>
        </form>
      </div>
    </editor-menu-bar>
    <editor-content
      class="whppt-richtext__content whppt-rich-content"
      :class="{ 'whppt-richtext__content--dark': dark }"
      :editor="editor"
    />
  </div>
</template>

<script>
import {
  Bold,
  BulletList,
  HardBreak,
  Heading,
  Italic,
  ListItem,
  OrderedList,
  Underline,
  History,
} from 'tiptap-extensions';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';

import WhpptSelect from '../Select';
import WhpptTextInput from '../Input';
import WhpptButton from '../Button';

// TODO: Move these icons to part of UI lib
import IBold from '../../../icons/Bold';
import IItalic from '../../../icons/Italic';
import IHeader2 from '../../../icons/Header2';
import IHeader3 from '../../../icons/Header3';
import IParagraph from '../../../icons/Paragraph';
import IBulletList from '../../../icons/BulletList';
import IOrderedList from '../../../icons/OrderedList';
import IUnderline from '../../../icons/Underline';
import ILink from '../../../icons/ChainLink';
import IClose from '../../../icons/Close';
import IUndo from '../../../icons/Undo';
import IRedo from '../../../icons/Redo';
import Link from './CustomLink';

const isEmptyValue = val => {
  return !val || val === '' || val === '<p></p>';
};

export default {
  name: 'WhpptRichText',
  components: {
    EditorContent,
    EditorMenuBar,
    IBold,
    IItalic,
    IHeader2,
    IHeader3,
    IParagraph,
    IBulletList,
    IOrderedList,
    IUnderline,
    ILink,
    IClose,
    IUndo,
    IRedo,
    WhpptSelect,
    WhpptTextInput,
    WhpptButton,
  },
  props: {
    value: { type: String, default: '' },
    hideMenu: { type: Boolean, default: false },
    hideStyle: { type: Boolean, default: false },
    hideHeaders: { type: Boolean, default: false },
    hideLists: { type: Boolean, default: false },
    hideLinks: { type: Boolean, default: false },
    dark: { type: Boolean, default: true },
  },
  data: () => ({
    editor: null,
    internal: undefined,
    editingLink: undefined,
    linkTypes: [
      { text: 'External', value: 'external' },
      { text: 'Page', value: 'page' },
    ],
  }),
  watch: {
    value(val) {
      if (this.internal !== val) {
        this.editor.setContent(isEmptyValue(val) ? 'Insert text here' : val);
      }
    },
  },
  mounted() {
    const vm = this;

    this.internal = this.value;

    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Underline(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new HardBreak(),
        new History(),
      ],
      content: isEmptyValue(this.value) ? 'Insert text here' : this.value,
      onUpdate({ getHTML }) {
        vm.internal = getHTML();
        vm.$emit('input', getHTML());
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    link(linkCommand) {
      linkCommand({ ...this.editingLink, target: this.editingLink.type === 'external' ? '_blank' : '' });
      this.editingLink = undefined;
    },
    removeLink(linkCommand) {
      linkCommand({});
      this.editingLink = undefined;
    },
    showLink(attrs) {
      if (!window.getSelection().toString()) return;
      this.editingLink = {
        type: attrs.target === '_blank' ? 'external' : 'page',
        href: '',
        text: '',
        openOnClick: false,
        ...attrs,
      };
    },
    closeLink() {
      this.editingLink = undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;

$primary-600: #5a67d8;

.whppt-richtext {
  width: 100%;
  color: black;

  .whppt-richtext__menubar {
    background-color: white;
    border: 1px solid $gray-200;
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    border-radius: 0.25rem;
  }

  .whppt-richtext__menu-section {
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

    .whppt-richtext__menubar {
      background-color: $gray-700;
      border: 1px solid $gray-200;
    }

    .whppt-richtext__menu-section {
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

.whppt-richtext {
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

// TODO: rename class to whppt-richtext__content before 2.0 release
.whppt-rich-content {
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
