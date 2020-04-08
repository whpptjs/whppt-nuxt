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
        <whppt-text-input v-bind="inputProps" :placeholder="placeholder" v-on="inputEvents" :label="label" />
      </div>
    </v-date-picker>
  </div>
</template>

<script>
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'WhpptDatePicker',
  components: {
    WhpptTextInput,
  },
  props: {
    label: String,
    value: [Date, String],
    minDate: [Date, String],
    maxDate: [Date, String],
    placeholder: String,
  },
  data: () => ({
    attrs: [{ highlight: { contentClass: 'bg-red-500' } }],
  }),
};
</script>
