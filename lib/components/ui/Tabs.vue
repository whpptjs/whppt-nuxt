<template>
  <div>
    <ul>
      <li v-for="(tab, index) in tabs" :key="index" @click="tabChanged(index)">
        {{ tab.name }} {{ index }}
        <br />
        <br />
      </li>
    </ul>
    <div>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
