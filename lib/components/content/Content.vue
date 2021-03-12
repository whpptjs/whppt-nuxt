<template>
  <div
    v-whppt-content="contentItems"
    :whitelist="whitelist"
    :blacklist="blacklist"
    class="whppt-contents"
    :class="{ 'whppt-contents--active': activeMenuItem }"
  >
    <div v-for="(content, index) in initContentItems" :key="`${content.key}-${index}`" class="whppt-content">
      <div v-if="activeMenuItem && !editSidebar" class="whppt-content__container container">
        <button @click.stop="showDuplicateComponentDialog(content.componentType, index, content)">
          Duplicate Component
        </button>
        <whppt-spacer width="0.25rem"></whppt-spacer>
        <whppt-button v-whppt-spacing="content" class="whppt-contents__spacing-button">
          Adjust Spacing
        </whppt-button>
      </div>
      <component
        :is="content.componentType"
        :ref="`${content.componentType}-${index}`"
        :content="content"
        :class="spacingClasses(content)"
        :container="container"
        :custom-class="customClass"
      ></component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { find, map, keyBy } from 'lodash';
import WhpptButton from '../ui/Button';
import WhpptSpacer from '../ui/Spacer';

export default {
  name: 'WhpptContent',
  components: {
    WhpptButton,
    WhpptSpacer,
  },
  props: {
    contentItems: { type: [Array, Object], required: true },
    container: { type: Boolean, default: true },
    whitelist: { type: Array, default: () => [] },
    blacklist: { type: Array, default: () => [] },
    customClass: { type: String, default: '' },
  },
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    ...mapState('whppt-nuxt/editor', ['activeMenuItem', 'editSidebar']),
    initContentItems() {
      // TODO: work out why this.page.pageType would ever be an object and if it ever is, should we allow that?
      if (this.page && this.page.pageType && typeof this.page.pageType === 'object') return;

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
    ...mapActions('whppt-nuxt/editor', ['selectContent', 'selectComponent']),
    ...mapMutations('whppt-nuxt/editor', ['editInSidebar']),
    doSelectComponent(componentType, index, content) {
      const refs = this.$refs[`${componentType}-${index}`];
      const component = refs && refs.length && refs[0];
      const parent = component.$parent;

      return this.selectContent({ el: parent.$el, value: parent.contentItems }).then(() => {
        const value = { value: content };

        return this.selectComponent({ el: component.$el, value });
      });
    },
    showDuplicateComponentDialog(componentType, index, content) {
      return this.doSelectComponent(componentType, index, content).then(() => this.editInSidebar('DuplicateComponent'));
    },
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

<style lang="scss" scoped>
.whppt-content {
  .whppt-content__container {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }
}
</style>

<style>
.whppt-contents--active {
  min-height: 200px;
}
</style>
