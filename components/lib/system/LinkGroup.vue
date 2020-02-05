<template>
  <div>
    <h1 class="whppt-header">Edit Link Group</h1>
    <div>
      <h3 class="whppt-header">Header of group</h3>
      checkbox goes here
      <e-link :data="$whppt.editData"></e-link>
    </div>
    <fieldset class="whppt-fieldset">
      <div class="whppt-flex-between">
        <label for="groupLink">Link in group: </label>
        <button class="whppt-icon-button" @click="addLink">
          <w-add-circle></w-add-circle>
        </button>
      </div>
      <select id="groupLink" v-model="selectKey">
        <option class="whppt-page__form--black" value="" disabled>Select a group</option>
        <option
          v-for="(template, index) in $whppt.editData.links"
          :key="index"
          class="whppt-page__form--black"
          :value="index"
          >{{ `Link set #${index + 1}` }}</option
        >
      </select>
    </fieldset>
    <div v-if="$whppt.editData.links && $whppt.editData.links[selectKey]">
      <h3 class="whppt-header">Edit link</h3>
      <e-link :data="$whppt.editData.links[selectKey]"></e-link>
    </div>
  </div>
</template>

<script>
import { without } from 'lodash';
import ELink from './Link';

export default {
  name: 'EditorLink',
  components: { ELink },
  data() {
    return {
      selectKey: '',
    };
  },
  methods: {
    addLink() {
      this.$whppt.editData.links = this.$whppt.editData.links || [];
      this.$whppt.editData.links.push({ type: 'page' });
    },
    removeLink(link) {
      without(this.$whppt.editData.links, link);
    },
  },
};
</script>
