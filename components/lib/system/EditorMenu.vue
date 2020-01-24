<template>
  <!-- https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/ -->
  <div class="menu">
    <div v-for="(item, index) in menuItems" :key="index" class="menu__item">
      <button @click="callMethod(item.action)">
        <component :is="item.icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptMenu',
  data: () => ({
    currentAction: undefined,
    menuItems: [
      { key: 'draggable', label: '', icon: 'w-draggable', group: '' },
      // { key: 'cursor', label: 'Cursor', icon: 'w-cursor', group: '' },
      // { key: 'select', label: 'Select', icon: 'w-select', group: '' },
      { key: 'edit', label: 'Edit', icon: 'w-edit', group: '' },
      { key: 'up', label: 'Up', icon: 'w-arrow-up', group: '' },
      { key: 'down', label: 'Down', icon: 'w-arrow-down', group: '' },
      { key: 'save', label: 'Save Page', icon: 'w-save', group: '', action: 'doSomething' },
      { key: 'publish', label: 'Publish', icon: 'w-publish', group: '' },
      { key: 'preview', label: 'Preview', icon: 'w-preview', group: '' },
      { key: 'page-settings', label: 'Page Settings', icon: 'w-settings', group: '' },
      // { key: 'seo', label: 'SEO', icon: 'w-seo', group: '' },
      // { key: 'socials', label: 'Socials', icon: 'w-socials', group: '' },
      // { key: 'documents', label: 'Documents', icon: 'w-document', group: '' },
      // { key: 'redirects', label: 'Redirects', icon: 'w-redirect', group: '' },
      // { key: 'logout', label: 'Logout', icon: 'w-logout', group: '' },
    ],
  }),
  methods: {
    callMethod(action, options) {
      return this[action](options);
    },
    doSomething() {
      console.log(this);
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0.4rem;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 100px;
}

.menu__item {
  margin: 0.4rem 0;
}

.menu__item button {
  border: none;
  color: white;
  background-color: transparent;
  cursor: pointer;
}

.menu__item--bordered {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.menu__item--active {
  border-radius: 100%;
  background-color: #262626;
  color: orangered;
}

.menu__item,
.menu__item--active svg {
  fill: currentColor;
}
</style>
