<template>
  <div>
    <client-only>
      <v-date-picker :value="value" @input="$emit('input', $event)"></v-date-picker>
    </client-only>
  </div>
</template>

<script>
let VDatePicker;

if (process.client) VDatePicker = require('v-calendar-ie11/lib/v-calendar.umd.js').DatePicker;

export default {
  name: 'WhpptDatepicker',
  components: { VDatePicker },
  props: {
    value: { type: Date, default: undefined },
  },
};
</script>

<style scoped></style>
