<template>
  <div>
    <settings-twitter :settings="pageSettings"></settings-twitter>
    <whppt-card>
      <whppt-button @click="saveSettings({ ...page, ...pageSettings })">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import SettingsTwitter from '../../SiteSettings/sharedTabs/Twitter';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import pageSettingsMixin from '../../../../util/mixins/pageSettings';

export default {
  name: 'PageSettingsTwitter',
  components: {
    SettingsTwitter,
    WhpptCard,
    WhpptButton,
  },
  mixins: [pageSettingsMixin],
  props: {
    page: { type: Object, required: true },
  },
  data: () => ({
    pageSettings: {
      twitter: {
        title: '',
        keywords: '',
        description: '',
        image: {
          imageId: '',
        },
      },
    },
  }),
  created() {
    if (this.page && this.page.twitter) {
      this.pageSettings.twitter.title = this.page.twitter.title;
      this.pageSettings.twitter.keywords = this.page.twitter.keywords;
      this.pageSettings.twitter.description = this.page.twitter.description;
      this.pageSettings.twitter.image = this.page.twitter.image;
    }
  },
};
</script>

<style scoped></style>
