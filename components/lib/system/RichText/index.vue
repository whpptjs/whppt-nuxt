<template>
  <div class="whppt-editor">
    <p class="font-xl whppt-editor__header">Rich Text Editor</p>
    <editor-menu-bar v-if="!selectedComponent.hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive, getMarkAttrs }" class="whppt-menubar" style="top: -52px">
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
    </editor-menu-bar>
    <editor-content class="whppt-rich-content" :editor="editor" />
  </div>
</template>

<script>
import {
  Bold,
  Italic,
  Underline,
  Heading,
  BulletList,
  ListItem,
  OrderedList,
  Link,
  HardBreak,
} from 'tiptap-extensions';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { mapState } from 'vuex';
import IBold from './icons/Bold';
import IItalic from './icons/Italic';
import IHeader1 from './icons/Header1';
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
    IHeader1,
    IHeader2,
    IHeader3,
    IParagraph,
    IBulletList,
    IOrderedList,
    IUnderline,
    ILink,
  },
  data() {
    return {
      editor: null,
      internal: undefined,
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
      linkCommand(this.editingLink);
      this.editingLink = {};
    },
    showLink(attrs) {
      const link = { type: 'page', href: '', text: '', openOnClick: false, ...attrs };
      this.editingLink = link;
    },
    closeLink() {
      this.editingLink = {};
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

.whppt-rich-content p:not(:first-child) {
  padding-top: 2rem;
}
</style>
