<template>
  <div class="whppt-full">
    <h1>Component</h1>
    {{ selectedComponent.value }}
    {{ selectedComponent.value.hasOwnProperty('reversed') }}
    <whppt-check-box
      v-if="selectedComponent.value.hasOwnProperty('reversed')"
      :value="selectedComponent.value.reversed"
      label="Reversed"
      @click="selectedComponent.value.reversed = !selectedComponent.value.reversed"
    ></whppt-check-box>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptCheckBox from '../whpptComponents/CheckBox';

export default {
  name: 'EditorTextBox',
  components: { WhpptCheckBox },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>
