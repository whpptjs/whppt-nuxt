<template>
  <div
    v-whppt-content="contentItems"
    class="whppt-contents"
    :class="{ 'whppt-contents--active': activeMenuItem, container }"
  >
    <div v-for="(content, index) in initContentItems" :key="`${content.key}-${index}`">
      <div class="container">
        <!-- Add if to this parent element for if activeMenuItem -->
        <!-- Relative spacing control button goes here -->
      </div>
      <component :is="content.componentType" :content="content" :class="spacingClasses(content)"></component>
    </div>
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
      const plugin = find(this.$whppt.plugins, p => (p.pageType && p.pageType.name) === this.page.pageType);

      const component = keyBy({ ...this.$whppt.components, ...plugin.pageType.components }, c => c.componentType);

      return map(this.contentItems, ci => {
        const componentInit = component && component[ci.componentType] && component[ci.componentType].init;
        if (typeof componentInit === 'function') componentInit({ $set: this.$set }, ci);

        return ci;
      });
    },
  },
  methods: {
    spacingClasses(content) {
      const { setMarginTop, setMarginBottom, setPaddingTop, setPaddingBottom } = this.$whppt.spacing;

      const marginTop = setMarginTop(content);
      const marginBottom = setMarginBottom(content);
      const paddingTop = setPaddingTop(content);
      const paddingBottom = setPaddingBottom(content);

      return [marginTop, marginBottom, paddingTop, paddingBottom];
    },
  },
};
</script>

<style>
.whppt-contents--active {
  min-height: 200px;
}
</style>
