<template>
  <div>
    <whppt-card>
      <form @submit.prevent>
        <whppt-text-input
          :id="`${$options._scopeId}-seo-title`"
          v-model="siteSettings.title"
          placeholder="Enter a title"
          label="Title"
          label-colour="black"
          info="This title will be used as a fallback for any page without one. The page title is shown in the browser's tab and used by search engines to match your page with search terms. Search results use the title to list the page."
        />
        <whppt-text-input
          :id="`${$options._scopeId}-seo-keywords`"
          v-model="siteSettings.keywords"
          placeholder="keywords (eg. page, simple)"
          label="Keywords"
          label-colour="black"
          info="These keywords will be used as a fallback for any page without them. Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma seperate your values to add multiple."
        />
        <whppt-text-area
          :id="`${$options._scopeId}-seo-description`"
          v-model="siteSettings.description"
          placeholder="Enter description"
          label="Description"
          rows="2"
          label-colour="black"
          info="This description will be used as a fallback for any page without one. The page description is not shown the page and is used by search engines to match your page with search terms. Search results can show this description."
        />
      </form>
    </whppt-card>
    <whppt-card>
      <whppt-button @click="saveSettings({ ...settings, ...siteSettings })">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import WhpptTextInput from '../../../ui/components/Input';
import WhpptTextArea from '../../../ui/components/Textarea';
import WhpptCard from '../../../ui/components/Card';
import WhpptButton from '../../../ui/components/Button';
import siteSettingsMixin from '../../../../util/mixins/siteSettings';

export default {
  name: 'SettingsEmail',
  components: { WhpptButton, WhpptTextInput, WhpptTextArea, WhpptCard },
  mixins: [siteSettingsMixin],
  props: { settings: { type: Object, default: () => ({}) } },
  data: () => ({
    siteSettings: {},
  }),
  created() {
    if (this.settings.title) this.siteSettings.title = this.settings.title;
    if (this.settings.keywords) this.siteSettings.keywords = this.settings.keywords;
    if (this.settings.description) this.siteSettings.description = this.settings.description;
  },
};
</script>
