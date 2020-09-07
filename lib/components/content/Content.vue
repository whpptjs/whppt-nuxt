<template>
  <div v-whppt-content="contentItems" :class="{ 'whppt-content--active': activeMenuItem, container }">
    <component
      :is="content.displayType"
      v-for="(content, index) in contentItems"
      :key="content.key + index"
      :content="content"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WhpptContent',
  props: {
    contentItems: {
      type: [Array, Object],
      required: true,
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

<style>
.whppt-content--active {
  min-height: 200px;
}
</style>
