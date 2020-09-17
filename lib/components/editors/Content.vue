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
import { filter, includes, orderBy } from 'lodash';
import WhpptButton from '../ui/Button';

export default {
  name: 'WhpptContent',
  components: { WhpptButton },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'selectedContentBlacklist', 'selectedContentWhitelist']),
    componentList() {
      if (!this.selectedComponent) return;

      let componentList = this.$whppt.components;

      if (this.selectedComponent.whitelist) {
        componentList = filter(this.$whppt.components, c => includes(this.selectedComponent.whitelist, c.displayType));
      }

      if (this.selectedComponent.blacklist) {
        componentList = filter(this.$whppt.components, c => !includes(this.selectedComponent.blacklist, c.displayType));
      }

      return orderBy(componentList, ['key']);
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
