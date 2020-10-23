<template>
  <client-only>
    <v-date-picker
      :value="value"
      v-bind="$attrs"
      :min-date="minDate ? minDate : undefined"
      :max-date="maxDate ? maxDate : undefined"
      :update-on-input="true"
      :popover="{ visibility: 'click' }"
      color="#5a67d8"
      @input="$emit('input', $event)"
    >
      <div slot-scope="{ inputProps, inputEvents }">
        <whppt-input
          :id="`${$options._scopeId}-whppt-date-input`"
          :label="label"
          :placeholder="placeholder"
          v-bind="inputProps"
          v-on="inputEvents"
        ></whppt-input>
      </div>
    </v-date-picker>
  </client-only>
</template>

<script>
import WhpptInput from '../ui/Input';

let VDatePicker;

if (process.client) VDatePicker = require('v-calendar-ie11/lib/v-calendar.umd.js').DatePicker;

export default {
  name: 'WhpptDatepicker',
  components: { WhpptInput, VDatePicker },
  props: {
    dark: { type: Boolean, default: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: () => '' },
    value: { type: [Date, String], default: undefined },
    minDate: { type: [Date, String], default: '' },
    maxDate: { type: [Date, String], default: '' },
  },
};
</script>

<style scoped></style>
