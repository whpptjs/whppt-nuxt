<template>
  <div v-if="!isLinkActive || !to.href">
    <slot></slot>
  </div>
  <nuxt-link v-else-if="linkType === 'nuxt-link'" :to="to.href">
    <slot></slot>
  </nuxt-link>
  <a v-else :href="to.href" :target="linkType === 'a' && to.type === 'external' && '_blank'">
    <slot></slot>
  </a>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WhpptLink',
  props: {
    to: {
      type: Object,
      default: () => ({
        type: 'page',
      }),
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
    isLinkActive() {
      return !this.activeMenuItem;
    },
    linkType() {
      if (this.to.type === 'page' || !this.to.type) return 'nuxt-link';
      return 'a';
    },
  },
};
</script>
