<template>
  <!-- https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/ -->
  <div class="menu">
    <div v-for="(item, index) in menuItems" :key="index" class="menu__item">
      <component :is="item.icon" />
    </div>
    <!-- Up -->
    <!--Down-->
    <!--Remove-->
    <!--Publish-->
    <!--Unpublish-->
    <!--Preview-->
    <!--Page Settings-->
    <!--SEO-->
    <!--Socials-->
    <!--Documents-->
    <!--Redirects-->
    <!--Logout-->
  </div>
</template>

<script>
export default {
  name: 'WhpptMenu',
  data: () => ({
    currentAction: undefined,
    menuItems: [
      { key: 'draggable', label: '', icon: 'draggable', group: '' },
      { key: 'cursor', label: 'Cursor', icon: '', group: '' },
      { key: 'select', label: 'Select', icon: '', group: '' },
      { key: 'edit', label: 'Edit', icon: '', group: '' },
      { key: 'up', label: 'Up', icon: '', group: '' },
      { key: 'down', label: 'Down', icon: '', group: '' },
      { key: 'publish', label: 'Publish', icon: '', group: '' },
      { key: 'preview', label: 'Preview', icon: '', group: '' },
      { key: 'page-settings', label: 'Page Settings', icon: '', group: '' },
      { key: 'seo', label: 'SEO', icon: '', group: '' },
      { key: 'socials', label: 'Socials', icon: '', group: '' },
      { key: 'documents', label: 'Documents', icon: '', group: '' },
      { key: 'redirects', label: 'Redirects', icon: '', group: '' },
      { key: 'logout', label: 'Logout', icon: '', group: '' },
    ],
  }),
};
</script>

<style scoped>
.menu {
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
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
