<template>
  <!-- <select class="whppt-tab">
    <option v-for="(item, index) in items" :key="index" @click="$emit('select', item)">
      {{ item }}
    </option>
  </select> -->
  <div>
    <div class="whppt-tabs">
      <div
        @click="selectTab(tab)"
        v-for="(tab, index) in tabs"
        class="whppt-tabs_title"
        :class="{
          'whppt-tabs_title--active': tab.active,
          'whppt-tabs_title--inactive': !tab.active,
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
export default {
  name: 'WhpptTabs',
  data() {
    return {
      tabs: [],
      selectedTab: this.$children[0],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => (tab.active = tab.title === selectedTab.title));
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
  cursor: pointer;
}

.whppt-tabs_title {
  padding: 10px 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 14px;
}

.whppt-tabs_title--active {
  color: white;
  border-bottom-color: white;
  border-bottom-width: 1;
  border-bottom-style: solid;
}

.whppt-tabs_title--active:hover {
  opacity: 0.8;
}

.whppt-tabs_title--inactive {
  color: grey;
}

.whppt-tabs_title--inactive:hover {
  color: grey;
  border-bottom-color: grey;
  border-bottom-width: 1;
  border-bottom-style: solid;
}
</style>
