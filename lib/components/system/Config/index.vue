<template>
  <whppt-tabs position="fixed" @changed="tabChanged">
    <whppt-tab v-for="(tab, index) in tabs" :id="tab.name" :key="index" :name="tab.label">
      <component :is="selectedTab" :settings="domainSettings" @closed="$emit('closed')" />
    </whppt-tab>
  </whppt-tabs>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import WhpptTabs from '../../ui/Tabs';
import WhpptTab from '../../ui/Tab';
import WhpptButton from '../../ui/Button';

import Domains from './tabs/Domains';

export default {
  name: 'WhpptConfigSettings',
  components: {
    Domains,
    WhpptTabs,
    WhpptTab,
    WhpptButton,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    domainSettings: {},
    selectedTab: 'domains',
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    tabs() {
      return [{ name: 'domains', label: 'Domains' }];
    },
  },
  mounted() {},
  methods: {
    ...mapActions('whppt-nuxt/page', ['savePage']),
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
