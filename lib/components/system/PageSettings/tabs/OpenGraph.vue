<template>
  <div>
    <settings-open-graph :settings="pageSettings"></settings-open-graph>
    <whppt-card>
      <whppt-button @click="saveSettings({ ...page, ...pageSettings })">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import SettingsOpenGraph from '../../SiteSettings/tabs/SettingsOG';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import pageSettingsMixin from '../../../../util/mixins/pageSettings';

export default {
  name: 'PageSettingsOpenGraph',
  components: {
    WhpptButton,
    WhpptCard,
    SettingsOpenGraph,
  },
  mixins: [pageSettingsMixin],
  props: {
    page: { type: Object, required: true },
  },
  data: () => ({
    pageSettings: {
      og: {
        title: '',
        image: {
          imageId: '',
        },
      },
    },
  }),
  created() {
    if (this.page && this.page.og) {
      this.pageSettings.og.title = this.page.og.title;
    }
  },
};
</script>

<style scoped></style>
