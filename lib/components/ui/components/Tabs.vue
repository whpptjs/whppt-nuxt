<template>
  <div>
    <ul class="whppt-tabs" :class="[{ 'whppt-tabs--wrap': wrap, 'whppt-tabs--dark': dark }, `whppt-tabs--${position}`]">
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
    dark: {
      type: Boolean,
      default: true,
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
      this.$emit('changed', this.tabs[tabIndex], tabIndex, prevIndex);

      if (this.activeTab || this.activeTab === 0) {
        this.tabs[prevIndex === undefined ? this.activeTab : prevIndex].isActive = false;
      } else {
        this.tabs[this.internalTabIndex].isActive = false;
        this.internalTabIndex = tabIndex;
      }

      this.tabs[tabIndex].isActive = true;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

$gray-200: #edf2f7;
$gray-900: #1a202c;

.whppt-tabs {
  display: flex;
  margin-bottom: 0.5rem;
  box-shadow: inset 0 -1px 0 $gray-200;
  background-color: white;
  border-radius: 0.25rem 0.25rem 0 0;
  list-style: none;
  padding: 0;
  overflow-x: auto;

  &--dark {
    background-color: $gray-900;
    color: white;
  }

  &--fixed {
    .whppt-tab {
      // min-width: 0; // TODO: work out why i needed this for fixed originally
      flex-grow: 1;
      flex-shrink: 1;
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
  white-space: nowrap;

  &--active {
    color: $primary-600;
    border-bottom: 2px solid $primary-600;
  }

  &__content {
  }
}
</style>
