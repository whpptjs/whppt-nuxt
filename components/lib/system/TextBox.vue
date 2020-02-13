<template>
  <div class="whppt-full ">
    <h1>Text box</h1>
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Text"
    />
    <whppt-select
      v-model="selectedComponent.value.alignment"
      :value="selectedComponent.value.alignment"
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
  name: 'EditorTextBox',
  components: { WhpptSelect, WhpptTextInput },
  data: () => ({
    items: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'Center' },
      { label: 'Right', value: 'right' },
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
