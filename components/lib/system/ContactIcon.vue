<template>
  <div class="whppt-full ">
    <h1>Contact icon</h1>
    <whppt-select
      v-model="selectedComponent.value.contactIcon"
      :value="selectedComponent.value.contactIcon"
      label="Text Align"
      :items="items"
    ></whppt-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'ContactIcon',
  components: { WhpptSelect, WhpptTextInput },
  data: () => ({
    items: [
      { label: 'Phone', value: 'phone' },
      { label: 'Email', value: 'email' },
      { label: 'Postal', value: 'postal' },
      { label: 'Website', value: 'website' },
    ],
  }),
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
