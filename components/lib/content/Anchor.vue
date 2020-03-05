<template>
  <div :id="content.id" v-whppt-anchor="content" data-property="id" class="whppt-anchor">
    <p v-if="activeMenuItem" class="bg-">Anchor with ID: {{ content.id }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WhpptAnchor',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
  },
};
</script>

<style>
.whppt-anchor {
  scroll-behavior: smooth;
}
</style>
