<template>
  <div>
    <open-graph-tab :settings="settings"></open-graph-tab>
    <whppt-card>
      <whppt-button @click="saveSettings(siteSettings)">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import OpenGraphTab from '../../SiteSettings/sharedTabs/OpenGraph';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import siteSettingsMixin from '../../../../util/mixins/siteSettings';

export default {
  name: 'SettingsOG',
  components: { OpenGraphTab, WhpptCard, WhpptButton },
  mixins: [siteSettingsMixin],
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    siteSettings: {
      og: {},
    },
  }),
  created() {
    if (this.settings && this.settings.og) this.siteSettings.og = this.settings.og;
  },
};
</script>
