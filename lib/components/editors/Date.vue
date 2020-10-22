<template>
  <whppt-datepicker v-model="date" label="Date" placeholder="Enter a date"></whppt-datepicker>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import WhpptDatepicker from '../ui/Datepicker';

export default {
  name: 'DateEditor',
  components: {
    WhpptDatepicker,
  },
  data: () => ({ date: undefined }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    currentValue() {
      return this.selectedComponent.property
        ? this.selectedComponent.value[this.selectedComponent.property]
        : this.selectedComponent.value;
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    onInput($event) {
      this.setSelectedComponentState({ value: $event });
    },
  },
};
</script>

<style scoped></style>
