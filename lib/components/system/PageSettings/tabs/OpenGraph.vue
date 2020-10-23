<template>
  <div>
    <open-graph-tab :settings="pageSettings"></open-graph-tab>
    <whppt-card>
      <whppt-button @click="saveSettings({ ...page, ...pageSettings })">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import OpenGraphTab from '../../SiteSettings/sharedTabs/OpenGraph';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import pageSettingsMixin from '../../../../util/mixins/pageSettings';

export default {
  name: 'PageSettingsOpenGraph',
  components: {
    WhpptButton,
    WhpptCard,
    OpenGraphTab,
  },
  mixins: [pageSettingsMixin],
  props: {
    page: { type: Object, required: true },
  },
  data: () => ({
    pageSettings: {
      og: {
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
    if (this.page && this.page.og) {
      this.pageSettings.og.title = this.page.og.title;
      this.pageSettings.og.keywords = this.page.og.keywords;
      this.pageSettings.og.description = this.page.og.description;
      this.pageSettings.og.image = this.page.og.image;
    }
  },
};
</script>

<style scoped></style>
