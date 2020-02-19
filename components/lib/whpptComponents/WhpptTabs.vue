<template>
  <div>
    <div class="whppt-tabs">
      <div
        @click="selectTab(tab)"
        v-for="(tab, index) in tabs"
        class="whppt-tabs__title"
        :class="{
          'whppt-tabs__title--active': tab.active,
          'whppt-tabs__title--inactive': !tab.active,
        }"
        :key="index"
      >
        {{ tab.title }}
      </div>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'WhpptTabs',
  data() {
    return {
      tabs: [],
      selectedTab: undefined,
    };
  },
  computed: mapState('whppt-nuxt/editor', ['editSidebarType']),
  watch: {
    editSidebarType() {
      this.selectTab(this.tabs[0]);
    },
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    this.selectedTab = this.tabs[0];
    this.selectedTab.active = true;
  },
  methods: {
    selectTab(t) {
      this.tabs.forEach(tab => (tab.active = tab.title === t.title));
      this.selectedTab = t;
    },
  },
};
</script>
<style>
.whppt-tabs {
  display: flex;
  width: 100%;
  font-size: 16px;
  margin: 20px 0;
  border-bottom-color: lightgrey;
  border-bottom-width: 1px;
  border-bottom-style: outset;
}

.whppt-tabs__title {
  padding: 10px 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.whppt-tabs__title--active {
  color: white;
  border-bottom-color: white;
  border-bottom-width: 3px;
  border-bottom-style: solid;
}

.whppt-tabs__title--active:hover {
  opacity: 0.8;
}

.whppt-tabs__title--inactive {
  color: grey;
}

.whppt-tabs__title--inactive:hover {
  color: grey;
  border-bottom-color: grey;
  border-bottom-width: 1;
  border-bottom-style: solid;
}
</style>
