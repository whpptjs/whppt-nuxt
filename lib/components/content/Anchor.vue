<template>
  <div :class="{ container }">
    <div :id="content.id" class="whppt-anchor whppt-anchor-offset"></div>
    <p v-if="activeMenuItem">
      <span v-whppt-anchor="content" class="whppt-hash" :data-property="property">#</span> {{ content[property] }}
    </p>
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
    property: {
      type: String,
      default: () => 'id',
    },
    container: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('whppt/editor', ['activeMenuItem']),
  },
};
</script>

<style>
.whppt-hash {
  font-size: 1.5rem;
  color: #42b883;
  font-style: italic;
}
</style>
