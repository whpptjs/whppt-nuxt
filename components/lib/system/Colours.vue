<template>
  <div class="whppt-full">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { map } from 'lodash';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'EditorBlank',
  components: { WhpptSelect },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent', 'options']),
    availableBackgroundColours() {
      if (!this.options && !this.options.colours) return [];
      return map(this.options.colours.background, (colour, colourKey) => ({ label: colourKey, value: colour }));
    },
    availableTextColours() {
      if (!this.options && !this.options.colours) return [];
      return map(this.options.colours.text, (colour, colourKey) => ({ label: colourKey, value: colour }));
    },
  },
};
</script>
