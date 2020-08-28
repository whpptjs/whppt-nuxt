<template>
  <md-field>
    <label v-if="label">{{ label }}</label>
    <md-select v-bind="$attrs">
      <md-option disabled>{{ label }}</md-option>
      <md-option v-for="(option, index) in items" :key="index" :value="option.value">{{ option.text }}</md-option>
    </md-select>
    <span class="md-helper-text">{{ info }}</span>
  </md-field>
</template>

<script>
export default {
  name: 'WhpptSelect',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: () => '',
    },
    info: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style scoped></style>
