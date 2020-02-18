<template>
  <div class="whppt-full">
    <h1>Component</h1>
    <whppt-check-box
      v-if="selectedComponent.value.hasOwnProperty('reversed')"
      :value="selectedComponent.value.reversed"
      label="Reversed"
      @click="selectedComponent.value.reversed = !selectedComponent.value.reversed"
    ></whppt-check-box>
    <whppt-select
      v-model="selectedComponent.value.backgroundColour"
      label="Background Colour"
      :items="availableColours"
    ></whppt-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { map } from 'lodash';
import WhpptCheckBox from '../whpptComponents/CheckBox';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'EditorTextBox',
  components: { WhpptSelect, WhpptCheckBox },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'options']),
    availableColours() {
      if (!this.options && this.options.colours) return [];
      return map(this.options.colours, (colour, colourKey) => ({ label: colourKey, value: colour }));
    },
  },
};
</script>
