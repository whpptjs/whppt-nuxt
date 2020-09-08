<template>
  <div class="whppt-flex whppt-overflow-hidden">
    <div v-if="isDraft">
      <editor-menu></editor-menu>
      <whppt-dialog fixed-height :md-active.sync="editInModal" @md-clicked-outside="closeModal">
        <component :is="editInModalType" :prefix="prefix" />
      </whppt-dialog>
    </div>
    <div class="whppt-content">
      <slot></slot>
    </div>
    <whppt-sidebar />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as Editors from '../system';
import SlugSettings from '../system/SlugSettings';
import PublishSettings from '../system/PublishSettings';
import WhpptDialog from '../ui/Dialog';
import WhpptButton from '../ui/Button';
import Close from '../icons/Close';

import WhpptTextInput from '../editors/WhpptTextInput';
import WhpptCheckBox from '../editors/__CheckBox';
import ContentsTree from '../editors/__ContentsTree';
import WhpptTab from '../editors/WhpptTab';
import WhpptTabs from '../editors/__WhpptTabs';

export default {
  name: 'WhpptEditorApp',
  components: {
    ...Editors,
    SiteSettings: () => import('../system/SiteSettings/index'),
    PageSettings: () => import('../system/PageSettings/index'),
    WhpptSidebar: () => import('../system/WhpptSidebar'),
    WhpptButton,
    WhpptDialog,
    WhpptTextInput,
    SlugSettings,
    PublishSettings,
    WhpptCheckBox,
    ContentsTree,
    WhpptTab,
    WhpptTabs,
    Close,
  },
  props: { prefix: { type: String, default: '' } },
  computed: {
    ...mapState('whppt-nuxt/editor', ['editInModal', 'editInModalType', 'editSidebar', 'editSidebarType', 'draft']),
    isDraft() {
      return this.draft;
    },
  },

  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar', 'closeModal']),
  },
};
</script>

<style>
.whppt-flex {
  display: flex;
  height: 100%;
}

.whppt-overflow-hidden {
  overflow-x: hidden;
}

.whppt-content {
  flex: 1;
}

.whppt__component--active {
  outline: 2px solid palegreen;
  /*outline-offset: -2px;*/
}

.whppt__content--active {
  outline: 2px solid orange;
}

.whppt__component--hover {
  outline: 2px solid blue;
  /*outline-offset: -2px;*/
}

.whppt__content--hover {
  outline: 2px solid red;
}
</style>
