<template>
  <div class="p-4">
    <whppt-text-input v-model="originalTemplate" label="Current Page Template" label-colour="black" disabled />
    <whppt-select
      v-model="newTemplate"
      :items="info.templates"
      label="New Page Template"
      key-prop="key"
      value-prop="label"
      style="padding-top: 2rem"
    />
    <div>
      <button
        v-if="template"
        class="whppt-settings__button"
        :class="{ disabled: !template.initTo }"
        @click="applyTemplate"
      >
        Apply Template
      </button>
    </div>
  </div>
</template>

<script>
import { find } from 'lodash';
import WhpptTextInput from '../../ui/Input';
import WhpptSelect from '../../ui/Select';

export default {
  name: 'WhpptChangeTemplate',
  components: { WhpptTextInput, WhpptSelect },
  props: {
    page: { type: Object, required: true },
    info: { type: Object, default: () => ({}) },
  },
  data: () => ({
    originalTemplate: '',
    newTemplate: '',
    showError: false,
  }),
  computed: {
    template() {
      return find(this.info.templates, t => t.key === this.newTemplate);
    },
  },
  mounted() {
    this.originalTemplate = this.page.template;
    this.newTemplate = this.page.template;
  },
  methods: {
    applyTemplate() {
      /*
       * template.initTo() to be deprecated in favour of new function name
       * */
      if (!this.template.initTo) return;
      this.template.initTo(this, this.page);
      this.page.template = this.newTemplate;
    },
  },
};
</script>

<style scoped>
.disabled {
  color: gray;
  border-color: gray;
}
</style>
