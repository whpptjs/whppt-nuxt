<template>
  <!--  <div v-if="draft" class="whppt-sidebar" :class="{ 'whppt-openEditor': editSidebar }">-->
  <!--    <div class="whppt-sidebar__inner">-->
  <!--      <whppt-tabs>-->
  <!--        <whppt-tab title="Selected Component">-->
  <!--          <component :is="editSidebarType"></component>-->
  <!--          <div v-if="selectedComponent && selectedComponent.value && selectedContent" class="whppt__default-container">-->
  <!--            <whppt-check-box-->
  <!--              v-if="selectedComponent.value.hasOwnProperty('reversed')"-->
  <!--              :value="selectedComponent.value.reversed"-->
  <!--              label="Reversed"-->
  <!--              @click="selectedComponent.value.reversed = !selectedComponent.value.reversed"-->
  <!--            ></whppt-check-box>-->
  <!--            <whppt-check-box-->
  <!--              :value="selectedComponent.value.inContainer"-->
  <!--              label="Put in a Container"-->
  <!--              @click="selectedComponent.value.inContainer = !selectedComponent.value.inContainer"-->
  <!--            ></whppt-check-box>-->
  <!--            <div class="mt-8">Spacing</div>-->
  <!--            <spacing-controls :selected-component="selectedComponent" :clamp-input="clampInput"></spacing-controls>-->
  <!--          </div>-->
  <!--        </whppt-tab>-->
  <!--        <whppt-tab v-if="selectedContent" title="Contents Tree">-->
  <!--          <contents-tree></contents-tree>-->
  <!--        </whppt-tab>-->
  <!--      </whppt-tabs>-->
  <!--      <whppt-button class="whppt-button__close" @click="closeSidebar">-->
  <!--        Close-->
  <!--      </whppt-button>-->
  <!--    </div>-->
  <!--  </div>-->
  <whppt-drawer :md-active.sync="editSidebar" md-persistent="full" md-fixed md-right>
    <!--    <whppt-button class="md-fab md-fab-top-right md-fixed md-dense md-secondary" @click="closeSidebar">-->
    <!--      <md-icon>close</md-icon>-->
    <!--    </whppt-button>-->
    <whppt-tabs class="md-transparent" md-elevation="1">
      <whppt-tab md-label="Selected Component">
        <component :is="editSidebarType" />
      </whppt-tab>
    </whppt-tabs>
  </whppt-drawer>
</template>

<script>
import { filter, flatMap, forEach, clamp } from 'lodash';
import { mapActions, mapState } from 'vuex';
import SpacingControls from '../whpptComponents/SpacingControls';
import WhpptCheckBox from '../whpptComponents/__CheckBox';

import WhpptButton from '../ui/Button';
import WhpptDrawer from '../ui/Drawer';
import WhpptTabs from '../ui/Tabs';
import WhpptTab from '../ui/Tab';

import * as Editors from './index';

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
    WhpptPage: () => import('./WhpptPage/index'),
    WhpptTabs,
    WhpptCheckBox,
    SpacingControls,
    WhpptTab,
    WhpptButton,
    WhpptDrawer,
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
      if (input) this.selectedComponent.value[property] = `${clamp(input, 0, 8)}`;
    },
  },
};
</script>
