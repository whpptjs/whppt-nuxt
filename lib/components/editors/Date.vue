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
import WhpptDatepicker from '../ui/Datepicker';

export default {
  name: 'DateEditor',
  components: {
    WhpptDatepicker,
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    onInput($event) {
      this.setSelectedComponentState({ value: $event, path: this.selectedComponent.property });
    },
  },
};
</script>

<style scoped></style>
