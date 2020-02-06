<template>
  <div class="whppt-full">
    <h1>Card Carousel</h1>
    <whppt-input-text
      v-model="editingCarousel.title"
      class="whppt-textBox--margin-top-20"
      placeholder="Enter text here"
      label="Title"
    />
    <whppt-input-text
      v-model="editingCarousel.description"
      class="whppt-textBox--margin-top-20"
      placeholder="Optional"
      label="Description"
    />
    <whppt-check-box
      :value="editingCarousel.reversed"
      label="Reversed"
      @click="editingCarousel.reversed = !editingCarousel.reversed"
    ></whppt-check-box>
    <whppt-select v-model="selectedIndex" :items="editingCarousel" label="Editing Card" />

    <div class="whppt-card-carousel__actions">
      <button class="whppt-card-carousel__actions-add" @click="add">Add a New Card After This</button>
      <button class="whppt-card-carousel__actions-remove" @click="remove" v-if="selectedIndex >= 0">
        Remove This Card
      </button>
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
import WhpptInputText from './InputText';
import WhpptSelect from './WhpptSelect';
import WhpptTab from './WhpptTab';
import WhpptTabs from './WhpptTabs';
import WhpptCheckBox from './CheckBox';

export default {
  name: 'EditorCardCarousel',
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
    editingCard() {
      return this.editingCarousel[this.$whppt.editDataProperty][this.selectedIndex] || {};
    },
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
};
</script>
<style>
.whppt-textBox--margin-top-20 {
  margin-top: 20px;
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
