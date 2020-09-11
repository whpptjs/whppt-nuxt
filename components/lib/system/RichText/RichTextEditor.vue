<template>
  <div>
    <editor-menu-bar v-if="!hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive, getMarkAttrs }">
        <div class="whppt-menubar" style="top: -52px">
          <div v-if="!hideStyle" class="whppt-menubar__section">
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
          <div v-if="!hideHeaders" class="whppt-menubar__section">
            <button aria-label="Paragraph" @click="commands.paragraph">
              <i-paragraph :fill="isActive.paragraph() ? 'orangered' : 'white'" />
            </button>
            <button aria-label="Header Size 2" @click="commands.heading({ level: 2 })">
              <i-header2 :fill="isActive.heading({ level: 2 }) ? 'orangered' : 'white'" />
            </button>
            <button aria-label="Header Size 3" @click="commands.heading({ level: 3 })">
              <i-header3 :fill="isActive.heading({ level: 3 }) ? 'orangered' : 'white'" />
            </button>
          </div>
          <div v-if="!hideLists" class="whppt-menubar__section">
            <button aria-label="Bullet List" @click="commands.bullet_list">
              <i-bullet-list :fill="isActive.bullet_list() ? 'orangered' : 'white'" />
            </button>
            <button aria-label="Ordered List" @click="commands.ordered_list">
              <i-ordered-list :fill="isActive.ordered_list() ? 'orangered' : 'white'" />
            </button>
          </div>
          <div v-if="!hideLinks" class="whppt-menubar__section">
            <button aria-label="Create Link" @click="showLink(getMarkAttrs('link'))">
              <i-link :fill="isActive.link() ? 'orangered' : 'white'" />
            </button>
          </div>
        </div>
        <form v-if="editingLink" @submit.prevent="link(commands.link)">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p class="font-xl whppt-editor__header" style="padding-top:1rem;">Link Details</p>
            <button class="whppt-menubar__close-button" type="button" @click="closeLink()"><w-close></w-close></button>
          </div>
          <div class="whppt-menubar__link-form">
            <div style="display: flex; justify-content: space-between;">
              <WhpptTextInput
                v-model="editingLink.href"
                type="text"
                class="whppt-menubar__input"
                label="href"
                :placeholder="editingLink.type === 'external' ? 'https://www.mysite.com.au' : '/myPage'"
              />
              <whppt-select
                v-model="editingLink.type"
                label="Link Type"
                class="whppt-menubar__input"
                :items="linkTypes"
              ></whppt-select>
            </div>
            <div class="whppt-flex-between" style="padding-top: 1rem;">
              <whppt-button type="button" @click="link(commands.link)">
                Apply
              </whppt-button>
              <whppt-button type="button" @click="removeLink(commands.link)">
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
  name: 'WhpptRichTextEditor',
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
    WhpptSelect,
    WhpptTextInput,
    WhpptButton,
  },
  props: {
    hideMenu: { type: Boolean },
    hideStyle: { type: Boolean },
    hideHeaders: { type: Boolean },
    hideLists: { type: Boolean },
    hideLinks: { type: Boolean },
    selectedValue: { type: Object, default: () => ({}) },
    selectedProperty: { type: String, default: '' },
  },
  data() {
    return {
      editor: null,
      internal: undefined,
      editingLink: undefined,
      linkTypes: ['external', 'page'],
    };
  },
  computed: mapState('whppt-nuxt/editor', ['richTextWatcher']),
  watch: {
    richTextWatcher(val) {
      if (this.internal !== this.selectedValue[this.selectedProperty]) {
        this.internal = this.selectedValue[this.selectedProperty];
        this.editor.setContent(
          isEmptyValue(this.selectedValue[this.selectedProperty])
            ? 'Start typing here '
            : this.selectedValue[this.selectedProperty]
        );
      }
    },
  },
  mounted() {
    const vm = this;
    this.internal = this.selectedValue[this.selectedProperty];

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
      content: isEmptyValue(this.selectedValue[this.selectedProperty])
        ? 'Start typing here '
        : this.selectedValue[this.selectedProperty],
      onUpdate({ getHTML }) {
        vm.internal = getHTML();
        vm.selectedValue[vm.selectedProperty] = getHTML();
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
