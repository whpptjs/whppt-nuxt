<template>
  <whppt-dialog v-if="editInModal" :is-active.sync="editInModal" @closed="$emit('closed')">
    <template v-slot:header>
      <whppt-toolbar>
        <div class="whppt-toolbar__content">
          <h2>
            {{ startCase(editInModalType) }}
          </h2>
          <whppt-button @click="$emit('closed')">Close</whppt-button>
        </div>
      </whppt-toolbar>
    </template>
    <component :is="editInModalType" :prefix="prefix" @closed="$emit('closed')" />
  </whppt-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { startCase } from 'lodash';
import WhpptDialog from '../ui/Dialog';
import WhpptButton from '../ui/Button';
import WhpptToolbar from '../ui/Toolbar';

const { additionalComponents } = global.$whppt.getAdditionalComponents('editors');

export default {
  name: 'WhpptEditorDialog',
  components: {
    ...additionalComponents,
    ConfigSettings: () => import('../system/Config/index'),
    SiteSettings: () => import('../system/SiteSettings/index'),
    PageSettings: () => import('../system/PageSettings/index'),
    Dashboard: () => import('../system/Dashboard/index'),
    WhpptDialog,
    WhpptButton,
    WhpptToolbar,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    startCase,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['editInModal', 'editInModalType']),
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
</style>
