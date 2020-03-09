<template>
  <div>
    <p class="font-xl">Carousel Items</p>
    <whppt-select v-model="editingCarouselItem" :items="editingCarouselItems" value-prop="text.title" />

    <div class="whppt-carousel__actions">
      <button class="whppt-carousel__actions-add" @click="add">Add New Item</button>
      <button v-if="editingCarouselItem" class="whppt-carousel__actions-remove" @click="remove">
        Remove Item
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'EditorCarousel',
  components: { WhpptTextInput, WhpptSelect },
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
    add() {
      const index = this.editingCarouselItems.indexOf(this.editingCarouselItem);
      this.editingCarouselItems.splice(index + 1, 0, {
        text: {
          title: '',
          description: '',
        },
        button: {
          text: '',
          icon: undefined,
          href: '',
          type: 'page',
        },
        image: {
          imageId: undefined,
          crop: {},
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
.whppt-carousel__actions button:hover {
  background: black;
}
.whppt-carousel__actions-remove:hover {
  color: red !important;
}
</style>
