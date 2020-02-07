<template>
  <div class="whppt-full">
    <h1>Gap</h1>
    <whppt-input-text
      type="number"
      v-model="$whppt.editData[$whppt.editDataProperty]"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Gap Height"
    />
    <!-- <input type="range" min="1" max="100" :value="50" v-model="$whppt.editData[$whppt.editDataProperty]" /> -->
  </div>
</template>

<script>
import WhpptInputText from './InputText';
import WhpptSelect from './WhpptSelect';
import WhpptTab from './WhpptTab';
import WhpptTabs from './WhpptTabs';
import WhpptCheckBox from './CheckBox';

export default {
  name: 'EditorCarousel',
  components: { WhpptInputText, WhpptTab, WhpptTabs, WhpptSelect, WhpptCheckBox },
  data() {
    return {
      selectedIndex: -1,
    };
  },
  computed: {
    editingCarousel() {
      return this.$whppt.editData;
    },
    editingCarouselItems() {
      return this.editingCarousel[this.$whppt.editDataProperty];
    },
    editingItem() {
      return this.editingCarouselItems[this.selectedIndex] || {};
    },
  },
  methods: {
    add() {
      this.editingCarouselItems.splice(this.selectedIndex + 1, 0, {
        title: '',
        description: '',
        ctaText: '',
        ctaIcon: undefined,
        ctaLink: '',
        image: undefined,
      });
      this.selectedIndex = this.selectedIndex + 1;
    },
    remove() {
      this.editingCarouselItems.splice(this.selectedIndex, 1);
      if (window.confirm('Do you want to remove this card?')) {
        if (this.selectedIndex > -1) this.selectedIndex = this.selectedIndex - 1;
      }
    },
  },
};
</script>
<style>
.whppt-textBox--margin-top-10 {
  margin-top: 10px;
}

.whppt-carousel__actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.whppt-carousel__actions button {
  background: rgba(0, 0, 0, 0.2);
  font-size: 12px;
  color: white;
  padding: 10px;
  border-width: 0;
  border-radius: 5px;
  cursor: pointer;
}
.whppt-carousel__actions button:focus {
  outline: none;
}
.whppt-carousel__actions button:hover {
  background: black;
}
.whppt-carousel__actions-remove:hover {
  color: red !important;
}
</style>
