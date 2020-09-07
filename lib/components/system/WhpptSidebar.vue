<template>
  <whppt-drawer :active.sync="editSidebar">
    <whppt-toolbar>
      <div class="toolbar-content">
        <h2>{{ startCase(editSidebarType) }}</h2>
        <whppt-button @click="closeSidebar"><close /></whppt-button>
      </div>
    </whppt-toolbar>
    <div v-if="editSidebar" class="content">
      <component :is="editSidebarType" />
    </div>
  </whppt-drawer>
</template>

<script>
import { filter, flatMap, forEach, clamp, startCase } from 'lodash';
import { mapActions, mapState } from 'vuex';
import WhpptCheckBox from '../editors/__CheckBox';
import Close from '../icons/Close';
import WhpptButton from '../ui/Button';
import WhpptDrawer from '../ui/Drawer';
import WhpptTabs from '../ui/Tabs';
import WhpptTab from '../ui/Tab';
import WhpptToolbar from '../ui/Toolbar';
import * as Editors from '../editors';
import SpacingControls from './SpacingControls';

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
    WhpptToolbar,
    ...additionalComponents,
    ...Editors,
    WhpptPage: () => import('./WhpptPage'),
    WhpptTabs,
    WhpptCheckBox,
    SpacingControls,
    WhpptTab,
    WhpptButton,
    WhpptDrawer,
    Close,
  },
  data: () => ({
    startCase,
  }),
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

<style lang="scss" scoped>
.content {
  padding: 1rem;
}

.toolbar-content {
  width: 100%;
  display: flex;
  align-items: center;

  h2 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-right: auto;
  }
}
</style>
