<template>
  <div>
    <twitter-tab :settings="settings"></twitter-tab>
    <whppt-card>
      <whppt-button @click="saveSettings(siteSettings)">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import TwitterTab from '../sharedTabs/Twitter';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import siteSettingsMixin from '../../../../util/mixins/siteSettings';

export default {
  name: 'SettingsTwitter',
  components: { WhpptButton, TwitterTab, WhpptCard },
  mixins: [siteSettingsMixin],
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    siteSettings: {
      twitter: {},
    },
  }),
  created() {
    if (this.settings && this.settings.twitter) this.siteSettings.twitter = this.settings.twitter;
  },
};
</script>
