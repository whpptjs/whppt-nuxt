<template>
  <div>
    <whppt-text-input
      v-model="editingCarouselItem.text.title"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Item Title"
    />
    <whppt-text-input
      v-model="editingCarouselItem.text.description"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Item Description"
    />
    <whppt-text-input
      v-model="editingCarouselItem.button.text"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Button Text"
    />
    <!-- <whppt-text-input
                v-model="editingCarouselItem.ctaIcon"
                class="whppt-textBox--margin-top-10"
                placeholder="Enter text here"
                label="Button Icon"
              /> -->
    <whppt-text-input
      v-model="editingCarouselItem.button.href"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Button Link"
    />
  </div>
</template>

<script>
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';

export default {
  name: 'EditorCarouselItemsTab',
  components: { WhpptTextInput },
  props: ['editingCarouselItem'],
};
</script>
<style>
.whppt-textBox--margin-top-10 {
  margin-top: 10px;
}
</style>
