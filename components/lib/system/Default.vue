<template>
  <div class="whppt-full"></div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EditorDefault',
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
};
</script>
