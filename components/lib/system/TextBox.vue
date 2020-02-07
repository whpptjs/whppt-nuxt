<template>
  <div class="whppt-full ">
    <h1>Text box</h1>
    <whppt-input-text
      v-model="$whppt.editData[$whppt.editDataProperty]"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Text"
    />
    <whppt-input-text v-model="$whppt.editData.marginTop" placeholder="Height in px" label="Margin Top" />
  </div>
</template>

<script>
import WhpptInputText from './WhpptTextInput';

export default {
  name: 'EditorTextBox',
  components: { WhpptInputText },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
</style>
