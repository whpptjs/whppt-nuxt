<template>
  <div class="whppt-editor">
    <editor-menu-bar v-if="!selectedComponent.hideMenu" :editor="editor">
      <div slot-scope="{ commands, isActive, getMarkAttrs }">
        <div class="whppt-menubar" style="top: -52px">
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
          <div v-if="!selectedComponent.hideHeaders" class="whppt-menubar__section">
            <button aria-label="Paragraph" @click="commands.paragraph">
              <i-paragraph class="whppt-editor__icon" :class="{ 'whppt-editor__icon--active': isActive.paragraph() }" />
            </button>
            <button aria-label="Header Size 2" @click="commands.heading({ level: 2 })">
              <i-header2
                class="whppt-editor__icon"
                :class="{ 'whppt-editor__icon--active': isActive.heading({ level: 2 }) }"
              />
            </button>
            <button aria-label="Header Size 3" @click="commands.heading({ level: 3 })">
              <i-header3
                class="whppt-editor__icon"
                :class="{ 'whppt-editor__icon--active': isActive.heading({ level: 3 }) }"
              />
            </button>
          </div>
          <div v-if="!selectedComponent.hideLists" class="whppt-menubar__section">
            <button aria-label="Bullet List" @click="commands.bullet_list">
              <i-bullet-list
                class="whppt-editor__icon"
                :class="{ 'whppt-editor__icon--active': isActive.bullet_list() }"
              />
            </button>
            <button aria-label="Ordered List" @click="commands.ordered_list">
              <i-ordered-list
                class="whppt-editor__icon"
                :class="{ 'whppt-editor__icon--active': isActive.ordered_list() }"
              />
            </button>
          </div>
          <div v-if="!selectedComponent.hideLinks" class="whppt-menubar__section">
            <button aria-label="Create Link" @click="showLink(getMarkAttrs('link'))">
              <i-link
                class="whppt-editor__icon"
                :class="{ 'whppt-editor__icon--active': isActive.link() }"
                :fill="isActive.link() ? 'orangered' : 'white'"
              />
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
    <editor-content class="whppt-rich-content" :editor="editor" />
  </div>
</template>

<script>
import { Bold, BulletList, HardBreak, Heading, Italic, ListItem, OrderedList, Underline } from 'tiptap-extensions';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { mapActions, mapState } from 'vuex';

import WhpptSelect from '../../ui/Select';
import WhpptTextInput from '../../ui/Input';
import WhpptButton from '../../ui/Button';

import IBold from '../../icons/Bold';
import IItalic from '../../icons/Italic';
import IHeader2 from '../../icons/Header2';
import IHeader3 from '../../icons/Header3';
import IParagraph from '../../icons/Paragraph';
import IBulletList from '../../icons/BulletList';
import IOrderedList from '../../icons/OrderedList';
import IUnderline from '../../icons/Underline';
import ILink from '../../icons/ChainLink';
import IClose from '../../icons/Close';
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
    WhpptSelect,
    WhpptTextInput,
    WhpptButton,
  },
  data() {
    return {
      editor: null,
      internal: undefined,
      editingLink: undefined,
      linkTypes: [
        { text: 'External', value: 'external' },
        { text: 'Page', value: 'page' },
      ],
    };
  },
  computed: mapState('whppt-nuxt/editor', ['richTextWatcher', 'selectedComponent']),
  watch: {
    richTextWatcher(val) {
      if (this.internal !== this.selectedComponent.value[this.selectedComponent.property]) {
        this.internal = this.selectedComponent.value[this.selectedComponent.property];
        this.editor.setContent(
          isEmptyValue(this.selectedComponent.value[this.selectedComponent.property])
            ? 'Insert text here'
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
        ? 'Insert text here'
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
