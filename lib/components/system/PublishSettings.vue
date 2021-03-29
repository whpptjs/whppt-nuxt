<template>
  <whppt-card>
    <form v-if="page" @submit.prevent>
      <div>
        <div style="font-weight: bold">Last Change:</div>
        <div>{{ formatDate(page.updatedAt) }}</div>
        <div v-if="!this.$whppt.disablePublishing">
          <div style="font-weight: bold">Last Published:</div>
          <div>{{ page.published ? formatDate(page.lastPublished) : 'Not published' }}</div>
        </div>
        <div class="whppt-publishing__buttons">
          <whppt-button v-if="!this.$whppt.disablePublishing" @click="publish">
            Publish Changes
          </whppt-button>
          <whppt-button v-if="!this.$whppt.disablePublishing" @click="unpublish">
            Unpublish Page
          </whppt-button>
          <whppt-button @click="showWarning = true">
            Delete Page
          </whppt-button>
        </div>
      </div>
    </form>
    <whppt-dialog v-if="showWarning" :is-active="showWarning" :width="800" :height="300">
      <template v-slot:header>
        <whppt-toolbar>
          <h3>Are you sure?</h3>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <div class="whppt-dialog__warning-message">
          <h4>Are you sure you want to delete this page</h4>
          <p><em>Warning: Once you delete this page there is no way to recover it.</em></p>
        </div>
        <div class="whppt-dialog__warning-actions">
          <whppt-button danger @click="deletePageFromDraft()">Delete</whppt-button>
          <whppt-button flat @click="showWarning = false">Cancel</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>
  </whppt-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';
import WhpptCard from '../ui/components/Card';
import WhpptButton from '../ui/components/Button';
import WhpptDialog from '../ui/components/Dialog';
import WhpptToolbar from '../ui/components/Toolbar';

export default {
  name: 'WhpptPublishSettings',
  components: {
    WhpptButton,
    WhpptCard,
    WhpptDialog,
    WhpptToolbar,
  },
  props: { prefix: { type: String, default: '' } },
  data: () => ({
    errorMessage: '',
    showWarning: false,
  }),
  computed: {
    ...mapState('whppt/page', ['page']),
  },
  methods: {
    ...mapActions('whppt/page', ['savePage', 'unpublishPage', 'deletePage', 'publishPage']),
    formatDate(date) {
      return dayjs(date).format('h:mmA dddd D MMMM YYYY');
    },
    deletePageFromDraft() {
      if (this.page.published) {
        return this.$toast.global.editorError('Unpublish the page first');
      }

      return this.deletePage().then(() => {
        this.$router.push(`/`);
        this.showWarning = false;
        this.$emit('closed');
      });
    },
    publish() {
      return this.savePage().then(() => {
        return this.publishPage();
      });
    },
    unpublish() {
      if (!this.page.published) return this.$toast.global.editorError('Page is not published');

      return this.unpublishPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-publishing__buttons {
  display: flex;
  margin-top: 2rem;

  button {
    margin-right: 0.5rem;
  }
}

.whppt-dialog__warning {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  height: 100%;

  h3,
  h4 {
    font-weight: bold;
  }

  p {
    font-size: 0.75rem;
  }

  &-message {
    margin-bottom: 1rem;
  }
}

.whppt-dialog__warning-actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  button {
    margin-left: 0.5rem;
  }
}
</style>
