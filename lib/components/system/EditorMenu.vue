<template>
  <!-- https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/ -->
  <div>
    <login-form ref="loginForm"></login-form>
    <div class="whppt-menu" :class="{ 'whppt-menu--expanded': !menuCollapsed }">
      <div v-if="!userCanEdit">
        <div v-if="menuCollapsed" class="whppt-menu__item">
          <button v-v-tooltip.right="'Expand Menu'" aria-label="Expand Menu" @click="toggleMenuCollapse">
            <w-expand />
          </button>
        </div>
        <div v-else>
          <div class="whppt-menu__item">
            <button v-v-tooltip.right="'Collapse Menu'" aria-label="Collapse Menu" @click="toggleMenuCollapse">
              <w-collapse />
            </button>
          </div>
          <div class="whppt-menu__item">
            <button aria-label="login" @click="showLogin()">
              <component :is="`w-login`" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="userCanEdit">
        <div v-if="menuCollapsed" class="whppt-menu__item">
          <button v-v-tooltip.right="'Expand Menu'" aria-label="Expand Menu" @click="toggleMenuCollapse">
            <w-expand />
          </button>
        </div>
        <div v-else>
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="whppt-menu__item"
            :class="{ 'whppt-menu__item--active': item.isActive && item.isActive() }"
          >
            <button
              v-if="item.action && !item.disabled"
              v-v-tooltip.right="item.label"
              :aria-label="item.label"
              @click="item.action()"
            >
              <component :is="item.icon" />
            </button>
            <button v-else v-v-tooltip.right="item.label" aria-label="">
              <component :is="item.icon" style="color: grey" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import { VTooltip } from 'v-tooltip';
import LoginForm from './LoginForm';

export default {
  name: 'EditorMenu',
  components: { LoginForm },
  directives: {
    VTooltip,
  },
  data: () => ({
    currentAction: undefined,
    menuCollapsed: false,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem', 'selectedContent', 'selectedComponent', 'environment']),
    ...mapState('whppt-nuxt/page', ['page']),
    ...mapState('whppt-nuxt/security', ['authUser']),
    menuItems() {
      return [
        {
          key: 'collapse',
          label: 'Collapse Menu',
          icon: this.menuCollapsed ? '' : 'w-collapse',
          group: '',
          action: () => this.toggleMenuCollapse(),
        },
        {
          key: 'select',
          label: 'Select Component',
          icon: 'w-pointer',
          group: '',
          action: () => this.selectMenuItem('select'),
          isActive: () => this.activeMenuItem === 'select',
        },
        {
          key: 'remove',
          label: 'Remove Component',
          icon: 'w-trash',
          group: '',
          action: () => this.removeLink(),
        },
        { key: 'up', label: 'Move Component Up', icon: 'w-arrow-up', group: '', action: () => this.moveComponentUp() },
        {
          key: 'down',
          label: 'Move Component Down',
          icon: 'w-arrow-down',
          group: '',
          action: () => this.moveComponentDown(),
        },
        {
          key: 'new-page',
          label: 'Create New Page',
          icon: 'w-new-page',
          group: 'page',
          action: () => this.newPage(),
        },
        {
          key: 'save',
          label: 'Save Current Page',
          icon: 'w-save',
          group: 'page',
          disabled: !this.page || !this.page._id,
          action: () => this.savePage(),
        },
        { key: 'nav', label: 'Save Navigation', icon: 'w-nav', group: 'nav', action: () => this.saveNav() },
        { key: 'footer', label: 'Save Footer', icon: 'w-footer', group: 'footer', action: () => this.saveFooter() },
        {
          key: 'publishPage',
          label: 'Publish Current Page',
          icon: 'w-publish',
          group: 'page',
          disabled: !this.page || !this.page._id,
          action: () => this.editInModal('publishSettings'),
        },
        {
          key: 'site-settings',
          label: 'Open Site Settings',
          icon: 'w-globe',
          group: 'site',
          action: () => this.editInModal('siteSettings'),
        },
        {
          key: 'page-settings',
          label: 'Open Page Settings',
          icon: 'w-settings',
          group: 'pageSettings',
          disabled: !this.page || !this.page._id,
          action: () => this.editInModal('pageSettings'),
        },
        { key: 'logout', label: 'Log out', icon: 'w-logout', group: 'security', action: () => this.logout() },
      ];
    },
    userCanEdit() {
      return this.authUser && this.authUser.roles.editor;
    },
  },
  mounted() {
    this.verifyUser();
  },
  methods: {
    ...mapActions('whppt-nuxt/security', ['verifyUser', 'logout']),
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
    showLogin() {
      this.$refs.loginForm.show();
    },
    toggleMenuCollapse() {
      this.menuCollapsed = !this.menuCollapsed;
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

.whppt-menu--expanded {
  padding: 0.5rem 0.25rem;
}

@media (max-width: 640px) {
  .whppt-menu {
    display: none;
  }
}

.whppt-menu__item svg {
  height: 2rem;
}

.whppt-menu__item--active {
  border-radius: 100%;
  background-color: #262626;
}

.whppt-menu__item button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
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

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^='top'] {
  margin-bottom: 5px;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^='bottom'] {
  margin-top: 5px;
}

.tooltip[x-placement^='bottom'] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^='right'] {
  margin-left: 5px;
}

.tooltip[x-placement^='right'] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -4px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^='left'] {
  margin-right: 5px;
}

.tooltip[x-placement^='left'] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
