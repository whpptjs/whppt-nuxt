<template>
  <div class="whppt-full">
    <p class="font-xl">Date</p>
    <whppt-date-picker
      v-model="selectedComponent.value[selectedComponent.property]"
      class="whppt-date-picker--margin-top-20"
      placeholder="Select date"
      :label="selectedComponent.property || 'Date'"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptDatePicker from '../whpptComponents/WhpptDatePicker';

export default {
  name: 'EditorDate',
  components: { WhpptDatePicker },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>
<style>
.whppt-date-picker--margin-top-20 {
  margin-top: 20px;
}
</style>
