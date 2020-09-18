<template>
  <div v-whppt-content="contentItems" :class="{ 'whppt-content--active': activeMenuItem, container }">
    <component
      :is="content.componentType"
      v-for="(content, index) in initContentItems"
      :key="content.key + index"
      :content="content"
    ></component>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { find, map, keyBy } from 'lodash';

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
    ...mapState('whppt-nuxt/page', ['page']),
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
    initContentItems() {
      const plugin = find(this.$whppt.plugins, p => p.pageType.name === this.page.pageType);
      const component = keyBy({ ...this.$whppt.components, ...plugin.pageType.components }, c => c.componentType);
      return map(this.contentItems, ci => {
        const componentInit = component && component[ci.componentType] && component[ci.componentType].init;
        if (typeof componentInit === 'function') componentInit({ $set: this.$set }, ci);
        return ci;
      });
    },
  },
};
</script>

<style>
.whppt-content--active {
  min-height: 200px;
}
</style>
