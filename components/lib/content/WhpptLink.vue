<template>
  <div v-if="!isLinkActive || !to.href">
    <slot></slot>
  </div>
  <nuxt-link v-else-if="to.type === 'page'" :to="to.href">
    <slot></slot>
  </nuxt-link>
  <a v-else-if="to.type === 'anchor'" :href="to.href" @click.prevent="navigateToAnchor(to.href)">
    {{ to.type }}
    <slot></slot>
  </a>
  <a v-else :href="to.href" :target="to.type === 'external' && '_blank'">
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
  },
  methods: {
    navigateToAnchor(to) {
      const elementId = to.replace('#', '');
      const anchor = document.getElementById(elementId);
      if (!anchor) return;

      anchor.scrollIntoView({ behavior: 'smooth' });
      console.log(this.$router);
      this.$router.hash = to;
    },
  },
};
</script>
