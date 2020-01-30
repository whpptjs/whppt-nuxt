<template>
  <!-- https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/ -->
  <div class="menu">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      class="menu__item"
      :class="{ 'menu__item--active': item.actionCommand && selector === item.actionCommand }"
    >
      <button @click="callMethod(item.action, item)">
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
    menuItems: [
      { key: 'draggable', label: '', icon: 'w-draggable', group: '' },
      // { key: 'cursor', label: 'Cursor', icon: 'w-cursor', group: '' },
      // { key: 'select', label: 'Select', icon: 'w-select', group: '' },
      { key: 'edit', label: 'Edit', icon: 'w-edit', group: '', action: 'selectSelector', actionCommand: 'edit' },
      { key: 'up', label: 'Up', icon: 'w-arrow-up', group: '' },
      { key: 'down', label: 'Down', icon: 'w-arrow-down', group: '' },
      { key: 'new-page', label: 'New Page', icon: 'w-new', group: 'page', action: '', actionCommand: '' },
      { key: 'save', label: 'Save Page', icon: 'w-save', group: 'page', action: 'savePage' },
      { key: 'publish', label: 'Publish', icon: 'w-publish', group: 'page' },
      { key: 'preview', label: 'Preview', icon: 'w-preview', group: 'page' },
      { key: 'page-settings', label: 'Page Settings', icon: 'w-settings', group: 'page' },
      // { key: 'seo', label: 'SEO', icon: 'w-seo', group: '' },
      // { key: 'socials', label: 'Socials', icon: 'w-socials', group: '' },
      // { key: 'documents', label: 'Documents', icon: 'w-document', group: '' },
      // { key: 'redirects', label: 'Redirects', icon: 'w-redirect', group: '' },
      // { key: 'logout', label: 'Logout', icon: 'w-logout', group: '' },
    ],
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selector']),
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['save']),
    ...mapMutations('whppt-nuxt/editor', ['setSelector']),
    callMethod(action, options) {
      if (!action) return;
      return this[action](options);
    },
    selectSelector({ actionCommand }) {
      this.setSelector(actionCommand);
    },
    savePage() {
      return this.save().then(page => {
        const { slug } = page;
        return this.$router.push(`/${slug}`);
      });
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  padding: 0rem 0.25rem;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 100px;
}

.menu__item {
  /* margin: 0.4rem 0; */
}
.menu__item--active {
  border-radius: 100%;
  background-color: #262626;
}

.menu__item button {
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
.menu__item:first-child {
  margin-top: 0.25rem;
}
.menu__item:last-child {
  margin-bottom: 0.25rem;
}

.menu__item--active button {
  color: orangered;
}

.menu__item--bordered {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.menu__item :hover {
  border-radius: 100%;
  background-color: #262626;
}

.menu__item,
.menu__item--active svg {
  fill: currentColor;
}
</style>
