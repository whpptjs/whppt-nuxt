<template>
  <w-editor-app>
    <header class="pb-16">
      <navbar-desktop />
    </header>
    <nuxt />
    <div>Footer</div>
  </w-editor-app>
</template>

<script>
import NavbarDesktop from '~/components/navbar/NavbarDesktop';

export default {
  name: 'LayoutDefault',
  components: {
    NavbarDesktop,
  },
};
</script>

<style></style>
