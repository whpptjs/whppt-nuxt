<template>
  <!-- https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/ -->
  <div class="whppt-menu">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      class="whppt-menu__item"
      :class="{ 'whppt-menu__item--active': item.isActive && item.isActive() }"
    >
      <button v-if="item.action && !item.disabled" @click="item.action()" :aria-label="item.label">
        <component :is="item.icon" />
      </button>
      <button v-else aria-label="">
        <component :is="item.icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  name: 'EditorMenu',
  data: () => ({
    currentAction: undefined,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem', 'selectedContent', 'selectedComponent', 'environment']),
    ...mapState('whppt-nuxt/page', ['page']),
    menuItems() {
      return [
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
          action: () => this.removeLink(),
        },
        { key: 'up', label: 'Up', icon: 'w-arrow-up', group: '', action: () => this.moveComponentUp() },
        {
          key: 'down',
          label: 'Down',
          icon: 'w-arrow-down',
          group: '',
          action: () => this.moveComponentDown(),
        },
        {
          key: 'new-page',
          label: 'New Page',
          icon: 'w-new-page',
          group: 'page',
          action: () => this.newPage(),
        },
        {
          key: 'save',
          label: 'Save Page',
          icon: 'w-save',
          group: 'page',
          disabled: !this.page || !this.page._id,
          action: () => this.savePage(),
        },
        {
          key: 'site-settings',
          label: 'Site Settings',
          icon: 'w-globe',
          group: 'site',
          action: () => this.editInModal('siteSettings'),
        },
        {
          key: 'page-settings',
          label: 'Page Settings',
          icon: 'w-settings',
          group: 'pageSettings',
          disabled: !this.page || !this.page._id,
          action: () => this.editInModal('pageSettings'),
        },
        {
          key: 'slug-settings',
          label: 'Slug Settings',
          icon: 'w-slugPopup',
          group: 'slugSettings',
          disabled: !this.page || !this.page._id,
          action: () => this.editInModal('slugSettings'),
        },
        { key: 'nav', label: 'Nav', icon: 'w-nav', group: 'nav', action: () => this.saveNav() },
        { key: 'footer', label: 'Footer', icon: 'w-footer', group: 'footer', action: () => this.saveFooter() },
        { key: 'footer', label: 'Footer', icon: 'w-publish', group: 'footer', action: () => this.publishPage() },
      ];
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/site', ['saveFooter', 'saveNav', 'publishFooter', 'publishNav']),
    ...mapActions('whppt-nuxt/page', ['savePage', 'publishPage']),
    ...mapActions('whppt-nuxt/editor', [
      'selectMenuItem',
      'moveComponentUp',
      'moveComponentDown',
      'removeComponent',
      'clearSelectedComponent',
      'clearSelectedContent',
    ]),
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
      this.clearSelectedContent();
      this.clearSelectedComponent();
      return this.editInSidebar('WhpptPage');
    },
    removeLink() {
      if (!this.selectedContent || !this.selectedComponent) return;
      if (window.confirm('Are you sure?')) {
        this.removeComponent();
      }
    },
    editATDW() {
      return this.editInModal('atdw');
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
