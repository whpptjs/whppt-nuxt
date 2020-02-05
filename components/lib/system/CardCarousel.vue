<template>
  <div class="whppt-full">
    <h1>Card Carousel</h1>
    <div class="whppt-checkbox">
      <input type="checkbox" v-model="$whppt.editData.reversed" />
      <span class="whppt-checkbox__title">Reversed</span>
    </div>
    <whppt-select :items="editingCarousel" v-model="selectedIndex" />

    <div class="whppt-card-carousel__actions">
      <button class="whppt-card-carousel__actions-add" @click="add">Add a New Card After This</button>
      <button class="whppt-card-carousel__actions-remove" @click="remove">Remove This Card</button>
    </div>

    <whppt-tabs v-if="selectedIndex >= 0">
      <whppt-tab title="Titles" :selected="true">
        <e-input
          v-model="editingCard.title"
          class="whppt-textBox--margin-top-20"
          placeholder="Enter text here"
          label="Title"
        />
        <e-input
          v-model="editingCard.subtitle"
          class="whppt-textBox--margin-top-20"
          placeholder="Enter text here"
          label="Subtitle"
        />
      </whppt-tab>
      <whppt-tab title="Image">
        Image cropper goes here
      </whppt-tab>
    </whppt-tabs>
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
  data() {
    return {
      selectedIndex: -1,
    };
  },
  methods: {
    add() {
      this.editingCarousel.splice(this.selectedIndex + 1, 0, {
        title: '',
        subtitle: '',
      });
      this.selectedIndex = this.selectedIndex + 1;
    },
    remove() {
      this.editingCarousel.splice(this.selectedIndex, 1);
      if (window.confirm('Do you want to remove this card?')) {
        if (this.selectedIndex > -1) this.selectedIndex = this.selectedIndex - 1;
      }
    },
  },
  computed: {
    editingCarousel() {
      return this.$whppt.editData[this.$whppt.editDataProperty];
    },
    editingCard() {
      return this.editingCarousel[this.selectedIndex] || {};
    },
  },
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
}
.whppt-checkbox {
  display: inline-flex;
  align-items: center;
  margin: 10px 0;
}
.whppt-checkbox__title {
  font-size: 14px;
  margin-left: 10px;
}
.whppt-card-carousel__actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.whppt-card-carousel__actions button {
  background: rgba(0, 0, 0, 0.2);
  font-size: 12px;
  color: white;
  padding: 10px;
  border-width: 0;
  border-radius: 5px;
  cursor: pointer;
}
.whppt-card-carousel__actions button:focus {
  outline: none;
}
.whppt-card-carousel__actions button:hover {
  background: black;
}
.whppt-card-carousel__actions-remove:hover {
  color: red !important;
}
</style>
