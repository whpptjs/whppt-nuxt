<template>
  <div v-if="inactive || !to.href">
    <slot></slot>
  </div>
  <!-- <nuxt-link v-else-if="to.type === 'page' && !exactPath" :to="to.href">
    <slot></slot>
  </nuxt-link> -->
  <a v-else-if="to.type === 'page' && !exactPath" :href="to.href">
    <slot></slot>
  </a>
  <a v-else-if="to.type === 'page' && exactPath" :href="to.href">
    <slot></slot>
  </a>
  <a v-else-if="to.type === 'anchor'" :href="to.href" @click.prevent="navigateToAnchor(to.href)">
    <slot></slot>
  </a>
  <a v-else-if="to.type === 'file'" target="_black" :href="to.href">
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
    inactive() {
      return this.activeMenuItem;
    },
    exactPath() {
      return this.$route.fullPath === this.to.href;
    },
  },
  methods: {
    navigateToAnchor(to) {
      const elementId = to.replace('#', '');
      const anchor = document.getElementById(elementId);
      if (!anchor) return;

      anchor.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, to);
    },
  },
};
</script>
