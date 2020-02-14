<template>
  <div>
    <whppt-text-input
      v-model="editingCarousel.title"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Carousel Title"
    />
    <whppt-text-input
      v-model="editingCarousel.description"
      class="whppt-textBox--margin-top-10"
      placeholder="Optional"
      label="Carousel Description"
    />
    <whppt-check-box
      :value="editingCarousel.reversed"
      label="Reversed"
      @click="editingCarousel.reversed = !editingCarousel.reversed"
    ></whppt-check-box>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';
import WhpptCheckBox from '../../whpptComponents/CheckBox';

export default {
  name: 'EditorCarouselGeneralTab',
  components: { WhpptTextInput, WhpptCheckBox },

  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    editingCarousel() {
      return this.selectedComponent.value;
    },
  },
};
</script>
<style>
.whppt-textBox--margin-top-10 {
  margin-top: 10px;
}
</style>
