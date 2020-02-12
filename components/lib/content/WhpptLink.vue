<template>
  <nuxt-link :event="activeMenuItem || disabled ? '' : 'click'" :to="to">{{ activeMenuItem || 'CLICKABLE' }}</nuxt-link>
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
    disabled: {
      type: Boolean,
      default: () => false,
    },
    to: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
  },
};
</script>
