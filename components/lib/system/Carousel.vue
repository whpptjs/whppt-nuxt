<template>
  <div class="whppt-full">
    <h1>Carousel</h1>
    <whppt-input-text
      v-model="editingCarousel.title"
      class="whppt-textBox--margin-top-10"
      placeholder="Enter text here"
      label="Carousel Title"
    />
    <whppt-input-text
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
    <whppt-select v-model="selectedIndex" :items="editingCarousel.items" label="Editing Item" />

    <div class="whppt-carousel__actions">
      <button class="whppt-carousel__actions-add" @click="add">Add New Item</button>
      <button class="whppt-carousel__actions-remove" @click="remove" v-if="selectedIndex >= 0">
        Remove Item
      </button>
    </div>

    <whppt-tabs v-if="selectedIndex >= 0">
      <whppt-tab title="Text" :selected="true">
        <whppt-input-text
          v-model="editingItem.title"
          class="whppt-textBox--margin-top-10"
          placeholder="Enter text here"
          label="Item Title"
        />
        <whppt-input-text
          v-model="editingItem.description"
          class="whppt-textBox--margin-top-10"
          placeholder="Enter text here"
          label="Item Description"
        />
        <whppt-input-text
          v-model="editingItem.ctaText"
          class="whppt-textBox--margin-top-10"
          placeholder="Enter text here"
          label="Button Text"
        />
        <whppt-input-text
          v-model="editingItem.ctaIcon"
          class="whppt-textBox--margin-top-10"
          placeholder="Enter text here"
          label="Button Icon"
        />
      </whppt-tab>
      <whppt-tab title="Image">
        Image cropper goes here
      </whppt-tab>
    </whppt-tabs>
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
