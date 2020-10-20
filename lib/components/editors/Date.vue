<template>
  <div>
    <!-- Maybe whppt-date-picker instead i guess -->
    <!--    <whppt-input-->
    <!--      :id="`${$options._scopeId}-date-input`"-->
    <!--      :value="currentValue"-->
    <!--      label="Date"-->
    <!--      placeholder="eg. 10/12/2020"-->
    <!--      @input="onInput"-->
    <!--    />-->
    <whppt-datepicker v-model="date"></whppt-datepicker>
    {{ selectedComponent.value }}
    <!-- Keep going here yes -->
  </div>
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
