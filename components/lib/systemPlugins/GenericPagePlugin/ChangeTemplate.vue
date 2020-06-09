<template>
  <div class="p-4">
    <whppt-select
      v-model="originalTemplate"
      :items="info.templates"
      label="Current Page Template"
      value-prop="label"
      key-prop="key"
      disabled
    />
    <whppt-select
      v-model="newTemplate"
      :items="info.templates"
      label="New Page Template"
      value-prop="label"
      key-prop="key"
      style="padding-top: 2rem"
    />
    <div>
      <button class="whppt-settings__button" @click="applyTemplate">Apply Template</button>
    </div>
  </div>
</template>

<script>
import { defaults, find } from 'lodash';
import WhpptSelect from '../../whpptComponents/WhpptSelectValue';

export default {
  name: 'WhpptGenericPage',
  components: { WhpptSelect },
  props: {
    page: {
      type: Object,
      required: true,
    },
    info: { type: Object, default: () => ({}) },
  },
  mounted() {
    this.originalTemplate = this.page.template;
    this.newTemplate = this.page.template;
  },
  data: () => ({
    originalTemplate: '',
    newTemplate: '',
    showError: false,
  }),
  methods: {
    applyTemplate() {
      const _newTemplate = find(this.info.templates, t => t.key === this.newTemplate);
      console.log('applyTemplate -> _newTemplate', _newTemplate);
      _newTemplate.initTo(this, this.page);
      console.log('applyTemplate -> this.page', this.page);
      this.page.template = this.newTemplate;
    },
  },
};
</script>

<style></style>
