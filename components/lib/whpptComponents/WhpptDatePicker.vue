<template>
  <div>
    <v-date-picker
      ref="datepicker"
      :value="new Date(value)"
      :attributes="attrs"
      v-bind="$attrs"
      :min-date="minDate ? minDate : undefined"
      :max-date="maxDate ? maxDate : undefined"
      :update-on-input="true"
      :popover="{ placement: 'bottom', visibility: 'click' }"
      class="flex-grow"
      color="gray"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    >
      <div slot-scope="{ inputProps, inputEvents }" class="relative appearance-none">
        <whppt-text-input
          v-bind="inputProps"
          :placeholder="placeholder"
          :label="label"
          readonly
          class="whppt-cursor-pointer"
          v-on="inputEvents"
        />
      </div>
    </v-date-picker>
  </div>
</template>

<script>
import WhpptTextInput from './WhpptTextInput';

let VDatePicker;

if (process.client) {
  VDatePicker = require('v-calendar-ie11/lib/v-calendar.umd.js').DatePicker;
}

export default {
  name: 'WhpptDatePicker',
  components: {
    WhpptTextInput,
    VDatePicker,
  },
  props: {
    label: { type: String, default: () => '' },
    value: { type: [Date, String], default: () => '' },
    minDate: { type: [Date, String], default: () => '' },
    maxDate: { type: [Date, String], default: () => '' },
    placeholder: { type: String, default: () => '' },
  },
  data: () => ({
    attrs: [{ highlight: { contentClass: 'bg-red-500' } }],
  }),
};
</script>

<style>
.whppt-cursor-pointer {
  cursor: pointer !important;
}
</style>
