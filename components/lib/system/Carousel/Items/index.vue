<template>
  <div>
    <whppt-select v-model="editingCarouselItem" :items="editingCarouselItems" label="Editing Item" />

    <div class="whppt-carousel__actions">
      <button class="whppt-carousel__actions-add" @click="add">Add New Item</button>
      <button v-if="editingCarouselItem" class="whppt-carousel__actions-remove" @click="remove">
        Remove Item
      </button>
    </div>

    <div class="whppt-carousel__item-details-container">
      <div class="whppt-carousel__item-details-divider" />
      <whppt-tabs v-if="editingCarouselItem" class="whppt-carousel__item-details" ref="carouselImageTabs">
        <whppt-tab title="Text">
          <carousel-text :editingCarouselItem="editingCarouselItem" />
        </whppt-tab>
        <whppt-tab title="Gallery">
          <gallery :value="editingCarouselItem.carouselImage.value.imageId" @input="changeTab" />
        </whppt-tab>
        <whppt-tab title="Cropping">
          <cropping :imageOptions="editingCarouselItem.carouselImage" />
        </whppt-tab>
      </whppt-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../../../whpptComponents/WhpptSelect';
import WhpptSelect from '../../../whpptComponents/WhpptSelect';
import WhpptTab from '../../../whpptComponents/WhpptTab';
import WhpptTabs from '../../../whpptComponents/WhpptTabs';
import Gallery from '../../EditImage/Gallery';
import Cropping from '../../EditImage/Cropping';
import CarouselText from './CarouselText';

export default {
  name: 'EditorCarouselItemsTab',
  components: { WhpptTextInput, WhpptTab, WhpptTabs, WhpptSelect, CarouselText, Gallery, Cropping },
  data() {
    return {
      editingCarouselItem: undefined,
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
  },
  methods: {
    changeTab(id) {
      this.editingCarouselItem.carouselImage.value.imageId = id;
      this.$refs.carouselImageTabs.selectTab(this.$refs.carouselImageTabs.tabs[2]);
    },
    add() {
      const index = this.editingCarouselItems.indexOf(this.editingCarouselItem);
      this.editingCarouselItems.splice(index + 1, 0, {
        title: '',
        description: '',
        ctaText: '',
        ctaIcon: undefined,
        ctaLink: '',
        carouselImage: {
          value: {
            imageId: undefined,
          },
          sizes: {},
        },
      });
      this.$nextTick(() => (this.editingCarouselItem = this.editingCarouselItems[index + 1])); // I know this sucks
    },
    remove() {
      const index = this.editingCarouselItems.indexOf(this.editingCarouselItem);
      if (window.confirm('Do you want to remove this item?')) {
        this.editingCarouselItems.splice(index, 1);
        if (index > 0) this.editingCarouselItem = this.editingCarouselItems[index - 1];
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
  margin: 20px 20px 0 0;
}

.whppt-carousel__item-details {
  flex: 1;
}
</style>
