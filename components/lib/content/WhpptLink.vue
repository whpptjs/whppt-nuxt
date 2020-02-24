<template>
  <div>
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
      <button>
        <slot></slot>
      </button>
    </component>
  </div>
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

<!--
<nuxt-link v-if="isLinkActive && to.href && !to.type" :to="to.href">
      <slot></slot>
    </nuxt-link>
    <nuxt-link v-if="isLinkActive && to.href && to.type === 'page'" :to="to.href">
      <slot></slot>
    </nuxt-link>
    <a v-if="isLinkActive && to.href && to.type === 'external'" :href="to.href" target="_blank">
      <slot></slot>
    </a>
    <a v-if="isLinkActive && to.href && to.type === 'anchor'" :href="to.href">
      <slot></slot>
    </a>
    <span v-if="!isLinkActive">
      <slot></slot>
    </span>-->
