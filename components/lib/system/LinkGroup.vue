<template>
  <div>
    <h1 class="whppt-header">Edit Link Group</h1>
    <div class="whppt-link-group__border">
      <h3 class="whppt-header">Header of group</h3>
      <whppt-check-box
        :value="$whppt.editData.showOnDesktop"
        label="Show on desktop"
        @click="$whppt.editData.showOnDesktop = !$whppt.editData.showOnDesktop"
      ></whppt-check-box>
      <whppt-check-box
        :value="$whppt.editData.showOnTablet"
        label="Show on tablet"
        @click="$whppt.editData.showOnTablet = !$whppt.editData.showOnTablet"
      ></whppt-check-box>
      <whppt-check-box
        :value="$whppt.editData.showOnPhone"
        label="Show on phone"
        @click="$whppt.editData.showOnPhone = !$whppt.editData.showOnPhone"
      ></whppt-check-box>
      <e-link :data="$whppt.editData"></e-link>
    </div>
    <div class="whppt-flex-between">
      <label for="groupLink">Link in group: </label>
      <button class="whppt-icon-button" @click="addLink">
        <w-add-circle></w-add-circle>
      </button>
    </div>
    <whppt-select v-model="selectKey" :items="$whppt.editData.links" />
    <div v-if="$whppt.editData.links && $whppt.editData.links[selectKey]">
      <div class="whppt-flex-between">
        <h3 class="whppt-header">Edit link #{{ selectKey + 1 }}</h3>
        <button class="whppt-icon-button" @click="removeLink">
          <w-remove></w-remove>
        </button>
      </div>

      <e-link :data="$whppt.editData.links[selectKey]"></e-link>
    </div>
  </div>
</template>

<script>
import { without } from 'lodash';
import ELink from './Link';
import WhpptCheckBox from './CheckBox';
import WhpptSelect from './WhpptSelect';

export default {
  name: 'EditorLink',
  components: { ELink, WhpptCheckBox, WhpptSelect },
  data() {
    return {
      selectKey: -1,
    };
  },
  methods: {
    changeCheck(value) {
      value = !value;
    },
    addLink() {
      this.$whppt.editData.links = this.$whppt.editData.links || [];
      this.$whppt.editData.links.push({ type: 'page' });
    },
    removeLink(link) {
      this.$whppt.editData.links.splice(this.selectKey, 1);
      if (window.confirm('Are you sure?')) {
        this.$whppt.editData.links = without(this.$whppt.editData.links, link);
        // if (this.selectKey > -1) this.selectKey = this.selectKey - 1;
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
