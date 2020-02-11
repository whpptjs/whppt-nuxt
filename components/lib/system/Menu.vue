<template>
  <!-- https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/ -->
  <div class="whppt-menu">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      class="whppt-menu__item"
      :class="{ 'whppt-menu__item--active': item.isActive && item.isActive() }"
    >
      <button @click="item.action()">
        <component :is="item.icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  name: 'WhpptMenu',
  data: () => ({
    currentAction: undefined,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
    menuItems() {
      return [
        { key: 'draggable', label: '', icon: 'w-draggable', group: '' },
        // { key: 'cursor', label: 'Cursor', icon: 'w-cursor', group: '' },
        {
          key: 'select',
          label: 'Select',
          icon: 'w-pointer',
          group: '',
          action: () => this.selectMenuItem('select'),
          isActive: () => this.activeMenuItem === 'select',
        },
        {
          key: 'remove',
          label: 'Remove',
          icon: 'w-trash',
          group: '',
          action: 'remove',
        },
        // {
        //   key: 'content',
        //   label: 'Content',
        //   icon: 'w-add-circle',
        //   group: '',
        //   action: () => this.selectMenuItem('content'),
        // },
        { key: 'up', label: 'Up', icon: 'w-arrow-up', group: '', action: 'moveUp' },
        {
          key: 'down',
          label: 'Down',
          icon: 'w-arrow-down',
          group: '',
          action: 'moveDown',
        },
        {
          key: 'new-page',
          label: 'New Page',
          icon: 'w-new-page',
          group: 'page',
          action: () => this.newPage(),
        },
        { key: 'save', label: 'Save Page', icon: 'w-save', group: 'page', action: 'save' },
        { key: 'publish', label: 'Publish', icon: 'w-publish', group: 'page' },
        { key: 'preview', label: 'Preview', icon: 'w-preview', group: 'page' },
        { key: 'page-settings', label: 'Page Settings', icon: 'w-settings', group: 'page' },
        // { key: 'seo', label: 'SEO', icon: 'w-seo', group: 'site' },
        // { key: 'socials', label: 'Socials', icon: 'w-socials', group: 'site' },
        // { key: 'documents', label: 'Documents', icon: 'w-document', group: 'site' },
        // { key: 'redirects', label: 'Redirects', icon: 'w-redirect', group: 'site' },
        // { key: 'logout', label: 'Logout', icon: 'w-logout', group: 'security' },
        { key: 'footer', label: 'Footer', icon: 'w-footer', group: 'footer', action: 'savePageFooter' },
      ];
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/site', ['saveFooter']),
    ...mapActions('whppt-nuxt/page', ['savePage']),
    ...mapActions('whppt-nuxt/editor', ['selectMenuItem']),
    ...mapMutations('whppt-nuxt/page', ['loaded']),
    ...mapMutations('whppt-nuxt/editor', ['editInModal', 'editInSidebar']),
    callMethod(action, options) {
      if (!action) return;
      return this[action](options);
    },
    save() {
      return this.savePage();
    },
    newPage() {
      return this.editInSidebar('WhpptPage');
    },
    remove() {
      return this.$whppt.remove();
    },
    moveDown() {
      return this.$whppt.moveDown();
    },
    moveUp() {
      return this.$whppt.moveUp();
    },
    editATDW() {
      return this.editInModal('atdw');
    },
    openSiteSettings() {
      return this.editInModal('siteSettings');
    },
    savePageFooter() {
      return this.saveFooter();
    },
  },
};
</script>

<style scoped>
.whppt-menu {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0 0.25rem;
  position: fixed;
  z-index: 51;
  top: 20px;
  left: 20px;
  border-radius: 100px;
}

.whppt-menu__item {
}

.whppt-menu__item--active {
  border-radius: 100%;
  background-color: #262626;
}

.whppt-menu__item button {
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
}
.whppt-menu__item:first-child {
  margin-top: 0.25rem;
}
.whppt-menu__item:last-child {
  margin-bottom: 0.25rem;
}

.whppt-menu__item--active button {
  color: orangered;
}

.whppt-menu__item--bordered {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.whppt-menu__item:hover {
  border-radius: 100%;
  background-color: #262626;
}

.whppt-menu__item,
.whppt-menu__item--active svg {
  fill: currentColor;
}
</style>
