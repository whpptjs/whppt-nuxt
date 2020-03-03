<template>
  <nav class="fixed w-full bg-gray-200 top-0 z-50">
    <div class="shadow-md w-full h-16 z-1">
      <div v-if="nav" class="h-full flex container">
        <div style="width: 212px; height: 100%" class="bg-red-700" />
        <navbar-links :nav="nav" />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import NavbarLinks from './NavbarLinksDesktop';

export default {
  name: 'NavbarDesktop',
  components: {
    NavbarLinks,
  },
  computed: {
    ...mapState('whppt-nuxt/site', ['nav']),
  },
};
</script>
