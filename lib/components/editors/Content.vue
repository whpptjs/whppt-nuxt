<template>
  <div class="whppt-content">
    <whppt-button
      v-for="component in componentList"
      :key="component.key"
      class="whppt-content__button"
      @click="addContent(component)"
    >
      {{ component.name }}
    </whppt-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { orderBy, find } from 'lodash';
import WhpptButton from '../ui/Button';

export default {
  name: 'WhpptContent',
  components: { WhpptButton },
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'selectedContentBlacklist', 'selectedContentWhitelist']),
    componentList() {
      if (!this.selectedComponent) return;

      const plugin = find(this.$whppt.plugins, p => p.pageType.name === this.page.pageType);

      const components = { ...this.$whppt.components, ...plugin.pageType.components };

      console.log(components);

      return orderBy(components, ['key']);
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['pushSelectedComponentState']),
    addContent(content) {
      this.pushSelectedComponentState({ value: { marginTop: '', inContainer: true, ...content } });
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-content {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__button {
    margin: 0.5rem 0;
  }
}
</style>
