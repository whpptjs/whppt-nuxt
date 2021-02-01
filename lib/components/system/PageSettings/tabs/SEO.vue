<template>
  <div>
    <whppt-card>
      <form @submit.prevent>
        <whppt-text-input
          :id="`${$options._scopeId}-title`"
          v-model="pageSettings.title"
          placeholder="Enter a page title"
          label="Title"
          label-colour="black"
          info="The page title is shown in the browser's tab and used by search engines to match your page with search terms. Search results use the title to list the page."
        />
        <whppt-text-input
          :id="`${$options._scopeId}-keywords`"
          v-model="pageSettings.keywords"
          placeholder="keywords (eg. page, simple)"
          label="Keywords"
          label-colour="black"
          info="Keywords are not shown on the page and are used by search engines to match your page with search terms. Comma separate your values to add multiple."
        />
        <whppt-text-area
          :id="`${$options._scopeId}-description`"
          v-model="pageSettings.description"
          placeholder="Enter description"
          label="Description"
          rows="2"
          label-colour="black"
          info="The page description is not shown the page and is used by search engines to match your page with search terms. Search results can show this description."
        />
        <whppt-text-input
          :id="`${$options._scopeId}-priority`"
          v-model="pageSettings.priority"
          placeholder="Enter a priority"
          label="Priority"
          label-colour="black"
          info="Priority lets search engines know which pages you deem most important. Values range from 0.0 to 1.0, with a default value of 0.5."
          @change="clampInput"
        />
        <whppt-select
          :id="`${$options._scopeId}-frequency`"
          v-model="pageSettings.frequency"
          :items="frequencies"
          item-text="id"
          item-value="value"
          info="Frequency tells search engines how often the page is likely to change."
        />
      </form>
    </whppt-card>
    <whppt-card>
      <whppt-button @click="saveSettings({ ...page, ...pageSettings })">Save Settings</whppt-button>
    </whppt-card>
  </div>
</template>

<script>
import { clamp } from 'lodash';
import WhpptTextInput from '../../../ui/components/Input';
import WhpptTextArea from '../../../ui/components/Textarea';
import WhpptSelect from '../../../ui/components/Select';
import WhpptButton from '../../../ui/components/Button';
import WhpptCard from '../../../ui/components/Card';

import savePageMixin from '../../../../util/mixins/pageSettings';

export default {
  name: 'PageSettingsSEO',
  components: {
    WhpptTextInput,
    WhpptTextArea,
    WhpptSelect,
    WhpptButton,
    WhpptCard,
  },
  mixins: [savePageMixin],
  data: () => ({
    frequencies: [
      { value: 'never', id: 'Never' },
      { value: 'yearly', id: 'Yearly' },
      { value: 'monthly', id: 'Monthly' },
      { value: 'weekly', id: 'Weekly' },
      { value: 'daily', id: 'Daily' },
      { value: 'hourly', id: 'Hourly' },
      { value: 'always', id: 'Always' },
    ],
    pageSettings: {
      title: '',
      keywords: '',
      description: '',
      priority: '',
      frequency: '',
    },
  }),
  created() {
    if (this.page) {
      this.pageSettings.title = this.page.title;
      this.pageSettings.keywords = this.page.keywords;
      this.pageSettings.description = this.page.description;
      this.pageSettings.priority = this.page.priority;
      this.pageSettings.frequency = this.page.frequency;
    }
  },
  methods: {
    clampInput(input) {
      return input ? (this.page.priority = clamp(input, 0, 1)) : 0.5;
    },
  },
};
</script>

<style>
.whppt-select__frequency-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-select__frequency-info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.whppt-select__frequency-input {
  margin: 0.2rem 0 0.5rem;
  appearance: none;
  display: block;
  width: 100%;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
}
</style>
