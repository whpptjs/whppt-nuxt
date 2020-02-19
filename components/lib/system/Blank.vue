<template>
  <div class="whppt-full">
    <h1>Component</h1>
    <whppt-select
      v-model="selectedComponent.value.backgroundColour"
      label="Background Colour"
      :items="availableBackgroundColours"
    ></whppt-select>
    <whppt-select
      v-model="selectedComponent.value.fontColour"
      label="Font Colour"
      :items="availableTextColours"
    ></whppt-select>
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
import { map } from 'lodash';
import WhpptCheckBox from '../whpptComponents/CheckBox';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'EditorBlank',
  components: { WhpptSelect, WhpptCheckBox },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'options']),
    availableBackgroundColours() {
      if (!this.options && this.options.colours) return [];
      return map(this.options.colours.background, (colour, colourKey) => ({ label: colourKey, value: colour }));
    },
    availableTextColours() {
      if (!this.options && this.options.colours) return [];
      return map(this.options.colours.text, (colour, colourKey) => ({ label: colourKey, value: colour }));
    },
  },
};
</script>
