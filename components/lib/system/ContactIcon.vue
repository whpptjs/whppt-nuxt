<template>
  <div class="whppt-full ">
    <h2 class="text-xl">Contact icon</h2>
    <whppt-select
      v-model="selectedComponent.value.contactIcon"
      :value="selectedComponent.value.contactIcon"
      label="Select an Icon"
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
      { label: 'Address', value: 'location' },
      { label: 'URL', value: 'url' },
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
