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
  computed: {
    template() {
      return find(this.info.templates, t => t.key === this.newTemplate);
    },
  },
  methods: {
    applyTemplate() {
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
