<template>
  <md-field v-bind="$attrs">
    <label v-if="label">{{ label }}</label>
    <md-input v-model="value" :type="type" @input="$emit('input', value)"></md-input>
    <span v-if="info" class="md-helper-text">{{ info }}</span>
  </md-field>
</template>

<script>
export default {
  name: 'WhpptInputField',
  props: {
    type: {
      type: String,
      default: () => 'text',
    },
    label: {
      type: String,
      default: () => '',
    },
    info: {
      type: String,
      default: () => '',
    },
    value: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style scoped></style>
