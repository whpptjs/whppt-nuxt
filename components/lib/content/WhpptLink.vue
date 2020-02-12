<template>
  <div>
    <nuxt-link v-if="isLinkActive && type === 'page'" :event="isLinkActive ? '' : 'click'" to="/">
      <slot></slot>
    </nuxt-link>
    <a v-if="isLinkActive && type === 'external'" :href="to" target="_blank">
      <slot></slot>
    </a>
    <a v-if="isLinkActive && type === 'anchor'" :href="to">
      <slot></slot>
    </a>
    <span v-if="!isLinkActive">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WhpptLink',
  props: {
    type: {
      type: String,
      default: () => 'page',
    },
    to: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
    isLinkActive() {
      return !this.activeMenuItem;
    },
  },
};
</script>
