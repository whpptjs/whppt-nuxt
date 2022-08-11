<template>
  <div v-if="inactive || !to.href" class="whppt-link">
    <slot></slot>
  </div>
  <!-- Temporary Work around to not use the nuxt link for SEO issue -->
  <a v-else-if="to.type === 'page' && !exactPath" :href="to.href" class="whppt-link" @click="clickLink()">
    <slot></slot>
  </a>
  <!--  <nuxt-link v-else-if="to.type === 'page' && !exactPath" :to="to.href" @click="clickLink()">-->
  <!--    <slot></slot>-->
  <!--  </nuxt-link>-->

  <a v-else-if="to.type === 'page' && exactPath" :href="to.href" class="whppt-link" @click="clickLink()">
    <slot></slot>
  </a>
  <a v-else-if="to.type === 'anchor'" :href="to.href" class="whppt-link" @click.prevent="navigateToAnchor(to.href)">
    <slot></slot>
  </a>
  <a
    v-else-if="to.type === 'file'"
    target="_blank"
    :href="`${baseFileUrl || baseAPIUrl}${to.href}`"
    class="whppt-link"
    @click="clickLink()"
  >
    <slot></slot>
  </a>
  <a v-else :href="to.href" :target="to.type === 'external' && '_blank'" class="whppt-link" @click="clickLink()">
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
        tracking: undefined,
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
    clickLink() {
      // https://support.google.com/tagmanager/answer/7182738?hl=en
      if (!process.client && !this.$config.googleTagManagerId) return;
      const trackingValues = {
        event: 'whppt.linkClicked',
        'gtm.element': this.$slots.default[0].elm,
        'gtm.elementClasses': this.$slots.default[0].data.staticClass,
        'gtm.elementUrl': `${this.baseFileUrl || this.baseAPIUrl}${this.to.href}`,
        'gtm.elementTarget': (this.to.type === 'file' || this.to.type === 'external') && '_blank',
      };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(trackingValues);
    },
  },
};
</script>
