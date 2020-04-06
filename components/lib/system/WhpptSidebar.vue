<template>
  <div v-if="draft" class="whppt-sidebar" :class="{ 'whppt-openEditor': editSidebar }">
    <div class="whppt-sidebar__inner">
      <whppt-tabs>
        <whppt-tab title="Selected Component">
          <component :is="editSidebarType"></component>
          <div v-if="selectedComponent && selectedComponent.value && selectedContent" class="whppt__default-container">
            <whppt-check-box
              v-if="selectedComponent.value.hasOwnProperty('reversed')"
              :value="selectedComponent.value.reversed"
              label="Reversed"
              @click="selectedComponent.value.reversed = !selectedComponent.value.reversed"
            ></whppt-check-box>
            <whppt-check-box
              :value="selectedComponent.value.inContainer"
              label="Put in a Container"
              @click="selectedComponent.value.inContainer = !selectedComponent.value.inContainer"
            ></whppt-check-box>
            <whppt-text-input
              v-model="selectedComponent.value.marginTopLarge"
              type="number"
              max="8"
              min="0"
              :placeholder="$whppt.defaultMarginTop"
              label="Margin Top - Large Screens (Desktop)"
              class="marin-top-input"
              @input="clampInput($event, 'marginTopLarge')"
            />
            <whppt-text-input
              v-model="selectedComponent.value.marginTopMedium"
              type="number"
              max="8"
              min="0"
              :placeholder="$whppt.defaultMarginTop"
              label="Margin Top - Medium Screens (Tablet)"
              class="marin-top-input"
              @input="clampInput($event, 'marginTopMedium')"
            />
            <whppt-text-input
              v-model="selectedComponent.value.marginTopSmall"
              type="number"
              max="8"
              min="0"
              :placeholder="$whppt.defaultMarginTop"
              label="Margin Top - Small Screens (Mobile)"
              class="marin-top-input"
              @input="clampInput($event, 'marginTopSmall')"
            />
          </div>
        </whppt-tab>
        <whppt-tab v-if="selectedContent" title="Contents Tree">
          <contents-tree></contents-tree>
        </whppt-tab>
      </whppt-tabs>
      <whppt-button class="whppt-button__close" @click="closeSidebar">
        Close
      </whppt-button>
    </div>
  </div>
</template>

<script>
import { filter, flatMap, forEach, clamp } from 'lodash';
import { mapActions, mapState } from 'vuex';
import * as Editors from '../system';
import WhpptTabs from '../whpptComponents/WhpptTabs';
import ContentsTree from '../whpptComponents/ContentsTree';
import WhpptTab from '../whpptComponents/WhpptTab';
import WhpptButton from '../whpptComponents/WhpptButton';
import WhpptCheckBox from '../whpptComponents/CheckBox';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';

const additionalComponents = {};

// global.$whppt.getPlugins('editors')

const types = global.$whppt.plugins;
const editors = flatMap(
  filter(types, t => t.editors),
  t => t.editors
);

forEach(editors, editor => {
  additionalComponents[editor.name] = editor.component;
});

export default {
  name: 'WhpptSidebar',
  components: {
    ...additionalComponents,
    ...Editors,
    WhpptPage: () => import('../system/WhpptPage'),
    WhpptTabs,
    WhpptCheckBox,
    ContentsTree,
    WhpptTextInput,
    WhpptTab,
    WhpptButton,
  },
  computed: {
    ...mapState('whppt-nuxt/editor', [
      'editSidebar',
      'editSidebarType',
      'editData',
      'selectedComponent',
      'selectedContent',
      'draft',
    ]),
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
    clampInput(input, property) {
      this.selectedComponent.value[property] = clamp(input, 0, 8);
    },
  },
};
</script>

<style>
@media (max-width: 640px) {
  .whppt-sidebar {
    display: none;
  }
}
</style>
