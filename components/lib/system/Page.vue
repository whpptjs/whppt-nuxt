<template>
  <div class="page">
    <h2>Create/Edit a Page</h2>
    <label for="template">Page Template: </label>
    <select id="template" v-model="page.template">
      <option value="">Select a Template</option>
      <option v-for="(template, index) in templates" :key="index" :value="template.key">{{ template.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'PageEdit',
  data: () => ({
    page: {
      template: undefined,
    },
  }),
  computed: {
    templates() {
      return this.$whppt.templates;
    },
  },
};
</script>

<style scoped></style>
