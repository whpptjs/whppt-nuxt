<template>
  <div :class="{ container }">
    <div :id="content.id" v-whppt-anchor="content" :data-property="property" class="whppt-anchor">
      <p v-if="activeMenuItem"><span class="whppt-hash">#</span> {{ content[property] }}</p>
    </div>
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
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
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
