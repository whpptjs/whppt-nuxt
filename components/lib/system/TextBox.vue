<template>
  <div class="whppt-full ">
    <h1>Text box</h1>
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Text"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'EditorTextBox',
  components: { WhpptTextInput },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
