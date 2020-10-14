<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <div v-if="isDraft">
      <editor-menu></editor-menu>
      <whppt-dialog :is-active.sync="editInModal" @closed="closeModal">
        <template v-slot:header>
          <whppt-toolbar>
            <div class="whppt-toolbar__content">
              <h2>{{ startCase(editInModalType) }}</h2>
              <whppt-button @click="closeModal">Close</whppt-button>
            </div>
          </whppt-toolbar>
        </template>
        <component :is="editInModalType" :prefix="prefix" @closed="closeModal" />
      </whppt-dialog>
      <whppt-dialog full :is-active.sync="dashboardVisible" @closed="closeDashboard">
        <template v-slot:header>
          <whppt-toolbar>
            <div class="whppt-toolbar__content">
              <h2>Welcome to your dashboard.</h2>
              <whppt-button @click="closeDashboard">Close</whppt-button>
            </div>
          </whppt-toolbar>
        </template>
        <dashboard></dashboard>
      </whppt-dialog>
    </div>
    <div class="whppt-content">
      <slot></slot>
    </div>
    <whppt-sidebar />
  </div>
</template>

<script>
import { startCase } from 'lodash';
import { mapState, mapActions } from 'vuex';
import EditorMenu from '../system/EditorMenu';
import SlugSettings from '../system/SlugSettings';
import PublishSettings from '../system/PublishSettings';
import WhpptDialog from '../ui/Dialog';
import WhpptButton from '../ui/Button';
import WhpptToolbar from '../ui/Toolbar';
import Close from '../icons/Close';

export default {
  name: 'WhpptEditorApp',
  components: {
    SiteSettings: () => import('../system/SiteSettings/index'),
    PageSettings: () => import('../system/PageSettings/index'),
    Dashboard: () => import('../system/Dashboard/index'),
    WhpptSidebar: () => import('../system/WhpptSidebar'),
    EditorMenu,
    WhpptToolbar,
    WhpptButton,
    WhpptDialog,
    SlugSettings,
    PublishSettings,
    Close,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    startCase,
  }),
  computed: {
    ...mapState('whppt/dashboard', ['dashboardVisible']),
    ...mapState('whppt-nuxt/editor', ['editInModal', 'editInModalType', 'editSidebar', 'editSidebarType', 'draft']),
    isDraft() {
      return this.draft;
    },
  },
  methods: {
    ...mapActions('whppt/dashboard', ['closeDashboard']),
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
  },
};
</script>

<style lang="scss" scoped>
.whppt-toolbar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h2 {
    font-weight: bold;
  }
}

.whppt-flex {
  display: flex;
  height: 100%;
}

.whppt-overflow-hidden {
  overflow-x: hidden;
}

.whppt-content {
  flex: 1;
  width: 100%;
}
</style>

<style lang="scss">
.whppt__component--active {
  outline: 2px solid palegreen;
}

.whppt__content--active {
  outline: 2px solid orange;
}

.whppt__component--hover {
  outline: 2px solid blue;
}

.whppt__content--hover {
  outline: 2px solid red;
}
</style>
