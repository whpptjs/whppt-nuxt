<template>
  <whppt-drawer :active.sync="editSidebar" position="right">
    <whppt-toolbar class="whppt-sidebar__toolbar">
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
import Close from '../icons/Close';
import WhpptButton from '../ui/Button';
import WhpptDrawer from '../ui/Drawer';
import WhpptTabs from '../ui/Tabs';
import WhpptTab from '../ui/Tab';
import WhpptToolbar from '../ui/Toolbar';
import * as Editors from '../editors';
import SpacingControls from '../editors/SpacingControls';

const additionalComponents = {};

// TODO: additionalComponents
// const { additionalComponents } = global.$whppt.getAdditionalComponents('editor');

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
    WhpptToolbar,
    WhpptTab,
    WhpptButton,
    WhpptDrawer,
    SpacingControls,
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

.whppt-sidebar__toolbar {
  position: sticky;
  left: 0;
  top: 0;
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
