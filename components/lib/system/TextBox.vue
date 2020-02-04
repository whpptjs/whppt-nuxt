<template>
  <div class="whppt-full ">
    <h1>Text box</h1>
    <e-input
      v-model="$whppt.editData[$whppt.editDataProperty]"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Text"
    />
  </div>
</template>

<script>
import EInput from './InputText';

export default {
  name: 'EditorTextBox',
  components: { EInput },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
