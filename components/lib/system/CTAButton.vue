<template>
  <div>
    <whppt-text-input
      v-model="selectedComponent.text"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Button Text"
    />
    <whppt-text-input
      v-model="selectedComponent.link"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Button Link"
    />
    <whppt-text-input
      v-model="selectedComponent.icon"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Button Icon"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'EditorCTAButton',
  components: { WhpptTextInput },

  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
};
</script>
<style>
.whppt-textBox--margin-top-10 {
  margin-top: 10px;
}
</style>
