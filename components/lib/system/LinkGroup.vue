<template>
  <div>
    <h1 class="whppt-header">Edit Link Group</h1>
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
      <e-link :data="selectedComponent.value"></e-link>
    </div>
    <div class="whppt-flex-between">
      <label for="groupLink">Link in group: </label>
      <button class="whppt-icon-button" @click="addLink">
        <w-add-circle></w-add-circle>
      </button>
    </div>
    <whppt-select v-model="selectKey" :items="selectedComponent.value.links" />
    <div v-if="selectKey">
      <div class="whppt-flex-between">
        <h3 class="whppt-header">Edit link - {{ selectKey.text }}</h3>
        <button class="whppt-icon-button" @click="removeLink(selectKey)">
          <w-remove></w-remove>
        </button>
      </div>

      <e-link :data="selectKey"></e-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { without } from 'lodash';
import WhpptCheckBox from '../whpptComponents/CheckBox';
import WhpptSelect from '../whpptComponents/WhpptSelect';
import ELink from '../whpptComponents/Link';

export default {
  name: 'EditorLink',
  components: { ELink, WhpptCheckBox, WhpptSelect },
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
      const newLink = { type: 'page' };
      this.selectedComponent.value.links.push(newLink);
    },
    removeLink(link) {
      if (window.confirm('Are you sure?')) {
        this.selectedComponent.value.links = without(this.selectedComponent.value.links, link);
        this.selectKey = undefined;
      }
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
</style>
