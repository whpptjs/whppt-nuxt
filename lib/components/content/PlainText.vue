<template>
  <div :class="{ container }">
    <div v-whppt-text="content" :data-property="property" class="whppt-plain-text">
      <p>{{ content[property] || 'Insert Text Here' }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WhpptPlainText',
  props: {
    content: {
      type: Object,
      required: true,
    },
    property: {
      type: String,
      default: () => 'text',
    },
    container: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
  },
};
</script>
