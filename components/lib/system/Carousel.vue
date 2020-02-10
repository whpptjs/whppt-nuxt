<template>
  <div v-if="editingCarousel" class="whppt-full">
    <h1>Carousel</h1>
    <whppt-tabs>
      <whppt-tab title="General">
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
      </whppt-tab>
      <whppt-tab title="Items">
        <whppt-select v-model="selectedIndex" :items="editingCarousel.items" label="Editing Item" />

        <div class="whppt-carousel__actions">
          <button class="whppt-carousel__actions-add" @click="add">Add New Item</button>
          <button v-if="selectedIndex >= 0" class="whppt-carousel__actions-remove" @click="remove">
            Remove Item
          </button>
        </div>

        <div class="whppt-carousel__item-details-container">
          <div class="whppt-carousel__item-details-divider" />
          <whppt-tabs v-if="selectedIndex >= 0" class="whppt-carousel__item-details">
            <whppt-tab title="Text">
              <whppt-text-input
                v-model="editingItem.title"
                class="whppt-textBox--margin-top-10"
                placeholder="Enter text here"
                label="Item Title"
              />
              <whppt-text-input
                v-model="editingItem.description"
                class="whppt-textBox--margin-top-10"
                placeholder="Enter text here"
                label="Item Description"
              />
              <whppt-text-input
                v-model="editingItem.ctaText"
                class="whppt-textBox--margin-top-10"
                placeholder="Enter text here"
                label="Button Text"
              />
              <whppt-text-input
                v-model="editingItem.ctaIcon"
                class="whppt-textBox--margin-top-10"
                placeholder="Enter text here"
                label="Button Icon"
              />
              <whppt-text-input
                v-model="editingItem.ctaLink"
                class="whppt-textBox--margin-top-10"
                placeholder="Enter text here"
                label="Button Link"
              />
            </whppt-tab>
            <whppt-tab title="Image">
              Image cropper goes here
            </whppt-tab>
          </whppt-tabs>
        </div>
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';
import WhpptTab from '../whpptComponents/WhpptTab';
import WhpptTabs from '../whpptComponents/WhpptTabs';
import WhpptCheckBox from '../whpptComponents/CheckBox';

export default {
  name: 'EditorCarousel',
  components: { WhpptTextInput, WhpptTab, WhpptTabs, WhpptSelect, WhpptCheckBox },
  data() {
    return {
      selectedIndex: -1,
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    editingCarousel() {
      return this.selectedComponent.value;
    },
    editingCarouselItems() {
      return this.editingCarousel[this.selectedComponent.property];
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
      this.selectedIndex = this.editingCarouselItems.length - 1;
    },
    remove() {
      if (window.confirm('Do you want to remove this card?')) {
        this.editingCarouselItems.splice(this.selectedIndex, 1);
        if (this.selectedIndex > -1) this.selectedIndex = this.selectedIndex - 1;
      }
    },
  },
};
</script>
<style>
.margin-top-input {
  display: none;
}

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

.whppt-carousel__item-details-container {
  display: flex;
}
.whppt-carousel__item-details-divider {
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: grey;
  margin: 20px 20px 20px 0;
}

.whppt-carousel__item-details {
  flex: 1;
}
</style>
