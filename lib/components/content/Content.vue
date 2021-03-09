<template>
  <div
    v-whppt-content="contentItems"
    :whitelist="whitelist"
    :blacklist="blacklist"
    class="whppt-contents"
    :class="{ 'whppt-contents--active': activeMenuItem }"
  >
    <div v-for="(content, index) in initContentItems" :key="`${content.key}-${index}`" class="whppt-content">
      <!-- TODO: Remove tailwind classes -->
      <div
        v-show="draft && activeActionsIndex === index"
        class="absolute top-0 right-0 z-50 text-white items-center flex p-1"
        style="background-color: #3d3d3d"
        @mouseenter="showContentActions(index)"
        @mouseleave="showContentActions(-1)"
      >
        <div class="text-xs">{{ startCase(content.componentType) }}</div>
        <button v-tooltip="'Delete'" @click.stop="remove(content.componentType, index, content)">
          <delete-icon class="h-3" aria-label="delete component" />
        </button>
        <button v-tooltip="'Move up'" @click.stop="moveUp(content.componentType, index, content)">
          <arrow-up-icon class="h-3" aria-label="move component up" />
        </button>
        <button v-tooltip="'Move down'" @click.stop="moveDown(content.componentType, index, content)">
          <arrow-down-icon class="h-3" aria-label="move component down" />
        </button>
        <button
          v-tooltip="'Show spacing controls'"
          @click.stop="showSpacingControls(content.componentType, index, content)"
        >
          <spacing-icon class="h-3" aria-label="move component down" />
        </button>
      </div>
      <div @mouseenter="showContentActions(index)" @mouseleave="showContentActions(-1)">
        <component
          :is="content.componentType"
          :ref="`${content.componentType}-${index}`"
          v-whppt-actions="{ content, action() {} }"
          :content="content"
          :class="spacingClasses(content)"
          :container="container"
          :custom-class="customClass"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { startCase, find, map, keyBy } from 'lodash';
import { VTooltip as Tooltip } from 'v-tooltip';
import {
  Trash as DeleteIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Spacing as SpacingIcon,
} from '../icons';
import WhpptButton from '../ui/components/Button';

export default {
  name: 'WhpptContent',
  components: {
    WhpptButton,
    DeleteIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    SpacingIcon,
  },
  directives: {
    Tooltip,
  },
  props: {
    contentItems: { type: [Array, Object], required: true },
    container: { type: Boolean, default: true },
    whitelist: { type: Array, default: () => [] },
    blacklist: { type: Array, default: () => [] },
    customClass: { type: String, default: '' },
  },
  data: () => ({
    startCase,
    activeActionsIndex: -1,
  }),
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
  },
  methods: {
    ...mapActions('whppt/editor', [
      'moveComponentUp',
      'moveComponentDown',
      'removeComponent',
      'selectContent',
      'selectComponent',
      'clearSelectedContent',
      'clearSelectedComponent',
      'doEditInSidebar',
    ]),
    showContentActions(index) {
      this.activeActionsIndex = index;
    },
    doSelectComponent(componentType, index, content) {
      const refs = this.$refs[`${componentType}-${index}`];

      const component = refs && refs.length && refs[0];

      // ? not sure if $parent is safe to use here.
      const parent = component.$parent;

      return this.selectContent({ el: parent.$el, value: parent.contentItems }).then(() => {
        const value = { value: content }; // should have label and property as well.

        return this.selectComponent({ el: component.$el, value });
      });
    },
    doClearComponent() {
      return Promise.all([this.clearSelectedContent(), this.clearSelectedComponent()]);
    },
    spacingClasses(content) {
      const { setMarginTop, setMarginBottom, setPaddingTop, setPaddingBottom } = this.$whppt.spacing;

      const marginTop = setMarginTop(content);
      const marginBottom = setMarginBottom(content);
      const paddingTop = setPaddingTop(content);
      const paddingBottom = setPaddingBottom(content);

      return [marginTop, marginBottom, paddingTop, paddingBottom];
    },
    remove(componentType, index, content) {
      return this.doSelectComponent(componentType, index, content).then(() => {
        if (window.confirm('Are you sure?')) {
          this.removeComponent();
          this.$whppt.clearSelectedContent();
        }
      });
    },
    moveUp(componentType, index, content) {
      return this.doSelectComponent(componentType, index, content)
        .then(() => this.moveComponentUp())
        .then(() => this.doClearComponent());
    },
    moveDown(componentType, index, content) {
      return this.doSelectComponent(componentType, index, content)
        .then(() => this.moveComponentDown())
        .then(() => this.doClearComponent());
    },
    showSpacingControls(componentType, index, content) {
      return this.doSelectComponent(componentType, index, content).then(() => this.doEditInSidebar('SpacingControls'));
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
