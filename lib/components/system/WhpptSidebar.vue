<template>
  <whppt-drawer :active.sync="editSidebar">
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
    WhpptPage: () => import('./WhpptPage'),
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
