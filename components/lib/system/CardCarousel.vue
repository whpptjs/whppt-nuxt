<template>
  <div class="whppt-full ">
    <h1>Card Carousel</h1>
    <whppt-select :items="['a', 'b']" />
    <whppt-tabs>
      <whppt-tab title="Services" :selected="true">
        ABC
      </whppt-tab>
      <whppt-tab title="TEST">
        HAHA
      </whppt-tab>
    </whppt-tabs>
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
import WhpptSelect from './WhpptSelect';
import WhpptTab from './WhpptTab';
import WhpptTabs from './WhpptTabs';

export default {
  name: 'EditorCardCarousel',
  components: { EInput, WhpptTab, WhpptTabs, WhpptSelect },
};
</script>
<style>
.whppt-cardCarousel--margin-top-20 {
  margin-top: 20px;
}
</style>
