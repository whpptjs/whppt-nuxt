<template>
  <div>
    <whppt-select
      v-model="newPage.template"
      :items="newPage.pageType.templates"
      label="Page Template"
      value-prop="label"
    />
  </div>
</template>

<script>
import WhpptSelect from '../../whpptComponents/WhpptSelect';

export default {
  name: 'WhpptGenericPage',
  components: { WhpptSelect },
  props: {
    newPage: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showError: false,
  }),
};
</script>

<style></style>
