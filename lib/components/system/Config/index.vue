<template>
  <whppt-tabs position="fixed" @changed="tabChanged">
    <whppt-tab v-for="(tab, index) in tabs" :id="tab.name" :key="index" :name="tab.label">
      <component :is="selectedTab" :settings="configSettings" @closed="$emit('closed')" />
    </whppt-tab>
  </whppt-tabs>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptTabs from '../../ui/components/Tabs';
import WhpptTab from '../../ui/components/Tab';
import WhpptButton from '../../ui/components/Button';

import Domains from './tabs/Domains';

const { additionalTabs, additionalComponents } = global.$whppt.getAdditionalComponents('configSettings');

export default {
  name: 'WhpptConfigSettings',
  components: {
    ...additionalComponents,
    Domains,
    WhpptTabs,
    WhpptTab,
    WhpptButton,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    configSettings: {},
    selectedTab: 'domains',
  }),
  computed: {
    ...mapState('whppt/page', ['page']),
    tabs() {
      return [{ name: 'domains', label: 'Domains' }, ...additionalTabs];
    },
  },
  mounted() {},
  methods: {
    ...mapActions('whppt/page', ['savePage']),
    tabChanged(_, index) {
      this.selectedTab = this.tabs[index].name;
    },
    // saveSettings() {
    //   if (this.page.priority) {
    //     this.page.priority = clamp(this.page.priority, 0, 1);
    //   }
    //   return this.savePage();
    // },
  },
};
</script>

<style lang="scss" scoped></style>
