<template>
  <div>
    <h5 class="text-sm font-bold">Split with gap</h5>
    <whppt-text-input
      v-model="selectedComponent.value.width"
      class="whppt-textBox--margin-top-20"
      info="Sets the first column's width. Calculated in 12ths, e.g. 2 = 2/12, 5 = 5/12"
      placeholder=""
      type="number"
      min="0"
      max="10"
      :label="selectedComponent.property"
      @input="clampInput($event, 'width', 0, 10)"
    />
    <whppt-text-input
      v-model="selectedComponent.value.gap"
      class="whppt-textBox--margin-top-20"
      info="Sets the width of the gap between the columns. Calculated in 12ths, e.g. 2 = 2/12, 5 = 5/12"
      placeholder=""
      type="number"
      min="0"
      max="5"
      label="Gap"
      @input="clampInput($event, 'gap', 0, 5)"
    />
  </div>
</template>

<script>
import { clamp } from 'lodash';
import { mapState } from 'vuex';

import WhpptTextInput from '../ui/Input';

export default {
  name: 'SplitContentGapEditor',
  components: { WhpptTextInput },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  mounted() {
    this.selectedComponent.width = this.selectedComponent.width || '5';
    this.selectedComponent.gap = this.selectedComponent.gap || '0';
  },
  methods: {
    clampInput(input, property, min, max) {
      if (input) this.selectedComponent.value[property] = `${clamp(input, min, max)}`;
    },
  },
};
</script>

<style scoped></style>
