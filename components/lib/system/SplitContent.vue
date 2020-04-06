<template>
  <div class="whppt-full ">
    <h1>Split Contents Width</h1>
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      @input="clampInput"
      class="whppt-textBox--margin-top-20"
      info="Sets the first column's width. Calculated in 12ths, e.g. 2 = 2/12, 5 = 5/12"
      placeholder=""
      type="number"
      min="1"
      max="11"
      :label="selectedComponent.property"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { clamp } from 'lodash';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'SplitContentEditor',
  components: { WhpptTextInput },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    clampInput(input) {
      this.selectedComponent.value[this.selectedComponent.property] = clamp(input, 1, 11);
    },
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
