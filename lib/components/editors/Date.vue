<template>
  <whppt-datepicker
    :value="selectedComponent.value[selectedComponent.property]"
    label="Date"
    placeholder="Enter a date"
    @input="onInput"
  ></whppt-datepicker>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptDatepicker from '../ui/components/Datepicker';

export default {
  name: 'DateEditor',
  components: {
    WhpptDatepicker,
  },
  computed: {
    ...mapState('whppt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    onInput($event) {
      this.setSelectedComponentState({ value: $event, path: this.selectedComponent.property });
    },
  },
};
</script>

<style scoped></style>
