<template>
  <div class="whppt-editor">
    <p class="font-xl whppt-editor__header">Rich Text Editor</p>

    <editor-menu-bar v-if="!selectedComponent.hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive, getMarkAttrs }">
        <div class="whppt-menubar" style="top: -52px">
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
          <div v-if="!selectedComponent.hideHeaders" class="whppt-menubar__section">
            <button aria-label="Paragraph" @click="commands.paragraph">
              <i-paragraph :fill="isActive.paragraph() ? 'orangered' : 'white'" />
            </button>
            <!-- <button aria-label="Header Size 1" @click="commands.heading({ level: 1 })">
            <i-header1 :fill="isActive.heading({ level: 1 }) ? 'orangered' : 'white'" />
          </button> -->
            <button aria-label="Header Size 2" @click="commands.heading({ level: 2 })">
              <i-header2 :fill="isActive.heading({ level: 2 }) ? 'orangered' : 'white'" />
            </button>
            <button aria-label="Header Size 3" @click="commands.heading({ level: 3 })">
              <i-header3 :fill="isActive.heading({ level: 3 }) ? 'orangered' : 'white'" />
            </button>
          </div>
          <div v-if="!selectedComponent.hideLists" class="whppt-menubar__section">
            <button aria-label="Bullet List" @click="commands.bullet_list">
              <i-bullet-list :fill="isActive.bullet_list() ? 'orangered' : 'white'" />
            </button>
            <button aria-label="Ordered List" @click="commands.ordered_list">
              <i-ordered-list :fill="isActive.ordered_list() ? 'orangered' : 'white'" />
            </button>
          </div>
          <div v-if="!selectedComponent.hideLinks" class="whppt-menubar__section">
            <button aria-label="Create Link" @click="showLink(getMarkAttrs('link'))">
              <i-link :fill="isActive.link() ? 'orangered' : 'white'" />
            </button>
          </div>
        </div>
        <form v-if="editingLink" @submit.prevent="link(commands.link)">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p class="font-xl whppt-editor__header" style="padding-top:1rem;">Link Details</p>
            <div class="whppt-menubar__close-button" @click="closeLink()"><w-close></w-close></div>
          </div>
          <div class="whppt-menubar__link-form">
            <div style="display: flex; justify-content: space-between;">
              <WhpptTextInput
                v-model="editingLink.href"
                type="text"
                class="whppt-menubar__input"
                label="href"
                placeholder="https://"
              />
              <whppt-select
                v-model="editingLink.type"
                label="Link Type"
                class="whppt-menubar__input"
                :items="linkTypes"
              ></whppt-select>
            </div>
            <div class="whppt-flex-between" style="padding-top: 1rem;">
              <whppt-button @click="link(commands.link)">
                Apply
              </whppt-button>
              <whppt-button @click="removeLink(commands.link)">
                Remove
              </whppt-button>
            </div>
          </div>
        </form>
      </div>
    </editor-menu-bar>
    <editor-content class="whppt-rich-content" :editor="editor" />
  </div>
</template>

<script>
import {
  Bold,
  BulletList,
  HardBreak,
  Heading,
  Italic,
  // Link,
  ListItem,
  OrderedList,
  Underline,
} from 'tiptap-extensions';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { mapState } from 'vuex';
import WhpptSelect from '../../whpptComponents/WhpptSelect';
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';
import WhpptButton from '../../whpptComponents/WhpptButton';

import Link from './CustomLink';
import IBold from './icons/Bold';
import IItalic from './icons/Italic';
// import IHeader1 from './icons/Header1';
import IHeader2 from './icons/Header2';
import IHeader3 from './icons/Header3';
import IParagraph from './icons/Paragraph';
import IBulletList from './icons/BulletList';
import IOrderedList from './icons/OrderedList';
import IUnderline from './icons/Underline';
import ILink from './icons/Link';

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
    // IHeader1,
    IHeader2,
    IHeader3,
    IParagraph,
    IBulletList,
    IOrderedList,
    IUnderline,
    ILink,
    WhpptSelect,
    WhpptTextInput,
    WhpptButton,
  },
  data() {
    return {
      editor: null,
      internal: undefined,
      editingLink: undefined,
      linkTypes: ['external', 'page'],
    };
  },
  computed: mapState('whppt-nuxt/editor', ['richTextWatcher', 'selectedComponent']),
  watch: {
    richTextWatcher(val) {
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
      ],
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
