<template>
  <div class="whppt-full ">
    <h1>Card Carousel</h1>
    <e-input
      v-model="$whppt.editData[$whppt.editDataProperty].title"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Title"
    />
    <e-input
      v-model="$whppt.editData[$whppt.editDataProperty].subtitle"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Subtitle"
    />
    <input type="checkbox" v-model="$whppt.editData[$whppt.editDataProperty].reversed" />Reverse
    <!-- <span class="slider round"></span> -->
  </div>
</template>

<script>
import EInput from './InputText';

export default {
  name: 'EditorCardCarousel',
  components: { EInput },
};
</script>
<style>
.whppt-cardCarousel--margin-top-20 {
  margin-top: 20px;
}
</style>
