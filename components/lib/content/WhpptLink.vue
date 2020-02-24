<template>
  <div v-if="!isLinkActive">
    <slot></slot>
  </div>
  <component
    :is="linkType"
    v-else
    :to="linkType === 'nuxt-link' && to.href"
    :href="linkType === 'a' && to.href"
    :target="linkType === 'a' && to.type === 'external' && '_blank'"
  >
    <slot></slot>
  </component>
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
