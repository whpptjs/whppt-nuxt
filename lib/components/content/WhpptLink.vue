<template>
  <div v-if="inactive || !to.href" class="whppt-link">
    <slot></slot>
  </div>
  <!-- Temporary Work around for SEO issue -->
  <a v-else-if="to.type === 'page' && !exactPath" :href="to.href" class="whppt-link">
    <slot></slot>
  </a>
  <!--  <nuxt-link v-else-if="to.type === 'page' && !exactPath" :to="to.href">-->
  <!--    <slot></slot>-->
  <!--  </nuxt-link>-->

  <a v-else-if="to.type === 'page' && exactPath" :href="to.href" class="whppt-link">
    <slot></slot>
  </a>
  <a v-else-if="to.type === 'anchor'" :href="to.href" class="whppt-link" @click.prevent="navigateToAnchor(to.href)">
    <slot></slot>
  </a>
  <a
    v-else-if="to.type === 'file'"
    target="_black"
    :href="`${baseFileUrl || baseAPIUrl}/file/${to.fileId}`"
    class="whppt-link"
  >
    <slot></slot>
  </a>
  <a v-else :href="to.href" :target="to.type === 'external' && '_blank'" class="whppt-link">
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
    ...mapState('whppt/editor', ['activeMenuItem', 'baseAPIUrl', 'baseFileUrl']),
    inactive() {
      return this.activeMenuItem;
    },
    exactPath() {
      return this.$route.fullPath === this.to.href;
    },
  },
  methods: {
    navigateToAnchor(to) {
      const [path, elementId] = to.split('#');
      if (path) return (window.location = to);

      const anchor = document.getElementById(elementId);
      if (!anchor) return;

      anchor.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, to);
    },
  },
};
</script>
