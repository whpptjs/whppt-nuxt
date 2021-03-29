<template>
  <div class="whppt-content">
    <div v-for="(component, index) in componentList" :key="`${component.key}-${index}`">
      <whppt-button
        class="whppt-content__button"
        @click="addContent(component)"
        @mouseover.native="changeComponentPreviewType(component.componentType)"
        @mouseout.native="changeComponentPreviewType('')"
      >
        {{ component.name }}
      </whppt-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { orderBy, find, filter, includes } from 'lodash';
import WhpptButton from '../ui/components/Button';

export default {
  name: 'WhpptContent',
  components: { WhpptButton },
  data: () => ({
    previewIndex: -1,
  }),
  computed: {
    ...mapState('whppt/page', ['page']),
    ...mapState('whppt/editor', ['selectedComponent']),
    componentList() {
      if (!this.selectedComponent) return;

      const plugin = find(this.$whppt.plugins, p => (p.pageType && p.pageType.name) === this.page.pageType);
      let components = [...this.$whppt.components, ...plugin.pageType.components];

      const whitelist = this.selectedComponent.whitelist;
      const blacklist = this.selectedComponent.blacklist;

      if (whitelist && whitelist.length) {
        components = filter(components, c => includes(whitelist, c.key));
      } else if (blacklist && blacklist.length) {
        components = filter(components, c => !includes(blacklist, c.key));
      }

      return orderBy(components, ['key']);
    },
  },
  methods: {
    ...mapActions('whppt/editor', ['pushSelectedComponentState', 'changeComponentPreviewType']),
    addContent(content) {
      const value = { marginTop: '', componentType: content.componentType };
      if (content.init) Object.assign(value, { ...content.init({ $set: this.$set }) });

      this.pushSelectedComponentState({ value });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-content {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__button {
    margin: 0.5rem 0;
    width: 100%;
  }

  &__preview {
    max-height: 0;
    background-color: $primary-600;
    overflow: hidden;
    transition: max-height 0.3s ease;

    &--active {
      max-height: 300px;
      transition: max-height 0.3s ease;
    }
  }
}

.whppt-preview {
  height: 300px;
}
</style>
