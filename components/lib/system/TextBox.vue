<template>
  <div class="whppt-full ">
    <p class="font-xl">Text box</p>
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      :label="selectedComponent.property || 'Text'"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

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
