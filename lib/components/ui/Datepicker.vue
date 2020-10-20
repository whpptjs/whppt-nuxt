<template>
  <div>
    <datepicker :value="value" @input="$emit('input', $event)"></datepicker>
  </div>
</template>

<script>
let Datepicker;
if (process.client) Datepicker = import('vuejs-datepicker');

export default {
  name: 'WhpptDatepicker',
  components: { Datepicker },
  props: {
    value: { type: Date, default: undefined },
  },
};
</script>

<style scoped></style>
