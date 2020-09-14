<template>
  <div>
    <p class="font-xl whppt-header">Edit Menu</p>
    <div class="whppt-link-group__border">
      <h3 class="whppt-header">Header of group</h3>
      <whppt-check-box
        :value="selectedComponent.value.showOnDesktop"
        label="Show on desktop"
        @click="selectedComponent.value.showOnDesktop = !selectedComponent.value.showOnDesktop"
      ></whppt-check-box>
      <whppt-check-box
        :value="selectedComponent.value.showOnTablet"
        label="Show on tablet"
        @click="selectedComponent.value.showOnTablet = !selectedComponent.value.showOnTablet"
      ></whppt-check-box>
      <whppt-check-box
        :value="selectedComponent.value.showOnMobile"
        label="Show on phone"
        @click="selectedComponent.value.showOnMobile = !selectedComponent.value.showOnMobile"
      ></whppt-check-box>
    </div>
    <div class="whppt-flex-between">
      <label>Link in group: </label>
      <button class="whppt-icon-button" aria-label="Add Link" @click="addLink">
        <w-add-circle></w-add-circle>
      </button>
    </div>
    <whppt-select v-model="selectKey" value-prop="text" :items="selectedComponent.value.links" />
    <div v-if="selectKey">
      <div class="whppt-flex-between">
        <h3 class="whppt-header">Edit link - {{ selectKey.text }}</h3>
        <button class="whppt-icon-button" aria-label="Remove Link" @click="removeLink(selectKey)">
          <w-remove></w-remove>
        </button>
      </div>

      <e-link :data="selectKey"></e-link>
      <whppt-check-box
        :value="selectKey.featured"
        label="Featured"
        @click="selectKey.featured = !selectKey.featured"
      ></whppt-check-box>

      <button
        :disabled="isTop(selectKey)"
        class="whppt-icon-button flex"
        aria-label="Move Up"
        @click="moveUp(selectKey)"
      >
        <w-arrow-up></w-arrow-up>
        Move Up
      </button>

      <button
        :disabled="isBottom(selectKey)"
        class="whppt-icon-button flex"
        aria-label="Move Up"
        @click="moveDown(selectKey)"
      >
        <w-arrow-down></w-arrow-down>
        Move Down
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { without, findIndex } from 'lodash';
import WhpptCheckBox from '../editors/__CheckBox';
import WhpptSelect from '../editors/WhpptSelect';

export default {
  name: 'Menu',
  components: { WhpptCheckBox, WhpptSelect },
  data() {
    return {
      selectKey: undefined,
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
  },
  methods: {
    changeCheck(value) {
      value = !value;
    },
    addLink() {
      this.selectedComponent.value.links = this.selectedComponent.value.links || [];
      const newLink = { type: 'page', featured: false };
      this.selectedComponent.value.links.push(newLink);
      this.selectKey = newLink;
    },
    removeLink(link) {
      if (window.confirm('Are you sure?')) {
        this.selectedComponent.value.links = without(this.selectedComponent.value.links, link);
        this.selectKey = undefined;
      }
    },
    isTop(item) {
      return findIndex(this.selectedComponent.value.links, l => l === item) === 0;
    },
    isBottom(item) {
      return (
        findIndex(this.selectedComponent.value.links, l => l === item) >= this.selectedComponent.value.links.length - 1
      );
    },
    moveUp(item) {
      const index = findIndex(this.selectedComponent.value.links, l => l === item);
      this.selectedComponent.value.links.splice(index, 1);
      this.selectedComponent.value.links.splice(index - 1, 0, item);
    },
    moveDown(item) {
      const index = findIndex(this.selectedComponent.value.links, l => l === item);

      this.selectedComponent.value.links.splice(index, 1);
      this.selectedComponent.value.links.splice(index + 1, 0, item);
    },
  },
};
</script>
<style>
.whppt-link-group__border {
  border-bottom-color: lightgrey;
  border-bottom-width: 1px;
  border-bottom-style: outset;
  margin-bottom: 2rem;
}
button:disabled {
  color: grey;
}
</style>
