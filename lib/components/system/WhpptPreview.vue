<template>
  <div v-if="componentPreviewType && componentData" class="whppt-component-preview">
    <div class="whppt-component-preview__inner">
      <component :is="componentPreviewType" v-if="componentData" :content="componentData" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { find, keyBy } from 'lodash';

export default {
  name: 'WhpptPreview',
  computed: {
    ...mapState('whppt/page', ['page']),
    ...mapState('whppt/editor', ['componentPreviewType']),
    componentData() {
      if (this.page && this.page.pageType && typeof this.page.pageType === 'object') return;

      const plugin = find(this.$whppt.plugins, p => (p.pageType && p.pageType.name) === this.page.pageType);

      const components = keyBy({ ...this.$whppt.components, ...plugin.pageType.components }, c => c.componentType);
      const data = {};

      // TODO: extract to more readable functions
      const hasPreviewInit =
        components &&
        components[this.componentPreviewType] &&
        typeof components[this.componentPreviewType].previewInit === 'function';

      if (hasPreviewInit) {
        components[this.componentPreviewType].previewInit({ $set: this.$set }, data);

        return data;
      }

      const hasInit =
        components &&
        components[this.componentPreviewType] &&
        typeof components[this.componentPreviewType].init === 'function';

      if (hasInit) {
        components[this.componentPreviewType].init({ $set: this.$set }, data);

        return data;
      }

      return undefined;
    },
  },
};
</script>

<style lang="scss">
.whppt-component-preview {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;

  &__inner {
    position: fixed;
    height: 100vh;
    width: calc(100% - 480px); // 480px is whppt sidebar width, TODO make variable
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
