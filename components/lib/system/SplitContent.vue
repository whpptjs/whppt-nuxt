<template>
  <div class="whppt-full ">
    <h1>Split Contents Width</h1>
    <whppt-text-input
      v-model="selectedComponent.value[selectedComponent.property]"
      class="whppt-textBox--margin-top-20"
      info="Sets the first column's width. Calculated in 12ths, e.g. 2 = 2/12, 5 = 5/12"
      placeholder=""
      type="number"
      :label="selectedComponent.property"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

export default {
  name: 'SplitContentEditor',
  components: { WhpptTextInput },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
