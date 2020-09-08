<template>
  <div>
    <ul class="whppt-tabs" :class="[{ 'whppt-tabs--wrap': wrap }, `whppt-tabs--${position}`]">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="whppt-tab"
        :class="{ 'whppt-tab--active': tab.isActive }"
        @click="tabChanged(index)"
      >
        {{ tab.name }}
      </li>
    </ul>
    <div class="whppt-tab__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptTabs',
  props: {
    activeTab: {
      type: [String, Number],
      default: undefined,
    },
    position: {
      type: String,
      default: 'left',
    },
    wrap: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    tabs: [],
    internalTabIndex: 0,
  }),
  watch: {
    activeTab(val, old) {
      this.tabChanged(val, old);
    },
  },
  created() {
    this.tabs = this.$children;
    this.$nextTick(() => {
      this.activeTab ? (this.tabs[this.activeTab].isActive = true) : (this.tabs[this.internalTabIndex].isActive = true);
    });
  },
  methods: {
    tabChanged(tabIndex, prevIndex) {
      this.$emit('changed', tabIndex);

      this.activeTab || typeof this.activeTab === 'number'
        ? (this.tabs[prevIndex || this.activeTab].isActive = false)
        : (this.tabs[this.internalTabIndex].isActive = false);

      this.tabs[tabIndex].isActive = true;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;
$gray-200: #edf2f7;

.whppt-tabs {
  display: flex;
  margin-bottom: 0.5rem;
  box-shadow: inset 0 -1px 0 $gray-200;

  &--fixed {
    .whppt-tab {
      min-width: 0;
      flex: 1;
    }
  }

  &--center {
    justify-content: center;
  }

  &--right {
    justify-content: flex-end;
  }

  &--wrap {
    flex-wrap: wrap;
  }
}

.whppt-tab {
  cursor: pointer;
  padding: 0.5rem 1rem;
  text-align: center;

  &--active {
    color: $primary-600;
    border-bottom: 2px solid $primary-600;
  }

  &__content {
  }
}
</style>
