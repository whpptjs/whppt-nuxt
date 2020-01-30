<template>
  <div class="w-editor">
    <h1 class="w-editor__header">Rich Text Editor</h1>
    <editor-menu-bar :editor="editor">
      <div slot-scope="{ commands, isActive, getMarkAttrs }" class="menubar" style="top: -52px">
        <button @click="commands.bold">
          <i-bold :fill="isActive.bold() ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.italic">
          <i-italic :fill="isActive.italic() ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.underline">
          <i-underline :fill="isActive.underline() ? 'orangered' : 'white'" />
        </button>

        <button @click="commands.paragraph">
          <i-paragraph :fill="isActive.paragraph() ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.heading({ level: 1 })">
          <i-header1 :fill="isActive.heading({ level: 1 }) ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.heading({ level: 2 })">
          <i-header2 :fill="isActive.heading({ level: 2 }) ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.heading({ level: 3 })">
          <i-header3 :fill="isActive.heading({ level: 3 }) ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.bullet_list">
          <i-bullet-list :fill="isActive.bullet_list() ? 'orangered' : 'white'" />
        </button>
        <button @click="commands.ordered_list">
          <i-ordered-list :fill="isActive.ordered_list() ? 'orangered' : 'white'" />
        </button>
        <button @click="showLink(getMarkAttrs('link'))">
          <i-link :fill="isActive.link() ? 'orangered' : 'white'" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="rich-content" :editor="editor" />
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
  computed: mapState('whppt-nuxt/editor', ['editTest']),
  watch: {
    editTest(val) {
      if (this.internal !== this.$whppt.editData.text) {
        this.internal = this.$whppt.editData.text;
        this.editor.setContent(
          isEmptyValue(this.$whppt.editData.text) ? 'Start typing here ' : this.$whppt.editData.text
        );
      }
    },
  },
  mounted() {
    const vm = this;
    this.internal = this.$whppt.editData.text;

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
      content: isEmptyValue(this.$whppt.editData.text) ? 'Start typing here ' : this.$whppt.editData.text,
      onUpdate({ getHTML }) {
        vm.internal = getHTML();
        vm.$whppt.editData.text = getHTML();
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
.w-editor {
  width: 100%;
  color: white;
}

.has-focus {
  border-radius: 3px;
  box-shadow: 0 0 0 3px #3ea4ffe6;
}

.menubar {
  padding: 0.2em;
  border: 1px solid white;
  color: white;
}
.menubar--active {
  color: orangered !important;
}

.menubar button {
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.ProseMirror {
  margin: 1em 0;
  border: 1px solid white;
  height: 100%;
  min-height: 400px;
  padding: 1em;
  height: 75vh;
}
.ProseMirror-focused {
  outline: none;
}
.editor__header {
  margin-bottom: 5px;
}
</style>
