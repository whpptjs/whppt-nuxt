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
      <!-- <component
          :is="content.componentType"
          v-whppt-actions="{ content, actions }"
          :content="content"
          :class="spacingClasses(content)"
          :container="container"
          :custom-class="customClass"
        /> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { find, map, keyBy } from 'lodash';
import WhpptSpacer from '../ui/components/Spacer';
import WhpptButton from '../ui/components/Button';

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
    ...mapState('whppt/page', ['page']),
    ...mapState('whppt/editor', ['activeMenuItem', 'editSidebar', 'draft']),
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
    actions() {
      return [
        { label: 'Up', classes: 'whppt-icon whppt-icon-up', action: this.moveComponentUp },
        { label: 'Down', classes: 'whppt-icon whppt-icon-down', action: this.moveComponentDown },
        { label: 'Remove', classes: 'whppt-icon whppt-icon-delete', action: this.remove },
        {
          label: 'Spacing',
          classes: 'whppt-icon whppt-icon-spacing ',
          action: () => this.doEditInSidebar('SpacingControls'),
        },
      ];
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', [
      'selectContent',
      'selectComponent',
      'moveComponentUp',
      'moveComponentDown',
      'removeComponent',
      'doEditInSidebar',
    ]),
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
    remove() {
      if (window.confirm('Are you sure you want to delete this component?')) return this.removeComponent();
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-content {
  position: relative;

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
