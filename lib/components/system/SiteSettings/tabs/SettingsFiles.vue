<template>
  <div>
    <whppt-card>
      <form @submit.prevent>
        <whppt-input
          :id="`${$options._scopeId}-settings-files-description`"
          v-model="file.description"
          label="File description"
          placeholder="Enter File Description"
          class="whppt-full"
        />
        <div class="whppt-settings__file-form-actions">
          <whppt-button class="whppt-settings__button" @click="$refs.fileInput.click()">
            <input ref="fileInput" type="file" style="display: none;" @input="upload" />
            <span>{{ file.formData ? file.formData.name : `Select File` }}</span>
          </whppt-button>
          <whppt-button :disabled="!file.formData" @click="save">Upload</whppt-button>
        </div>
      </form>
    </whppt-card>
    <whppt-card>
      <whppt-table
        dense
        :items="files"
        :headers="headers"
        :page.sync="currentPage"
        :per-page.sync="limit"
        :total="total"
      >
        <template v-slot:item.name="{ item }">
          <whppt-input :id="`${$options._scopeId}-settings-file-name`" v-model="item.name"></whppt-input>
        </template>
        <template v-slot:item.description="{ item }">
          <whppt-input :id="`${$options._scopeId}-settings-file-description`" v-model="item.description"></whppt-input>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="whppt-settings__file-actions">
            <button>
              <a target="_blank" :href="getUrl(item)">
                <external-link />
              </a>
            </button>
            <button @click="copyUrl(item)">
              <link-icon />
            </button>
            <button @click="saveFileDetails(item)">
              <save />
            </button>
            <button @click="itemToBeRemoved = item">
              <remove />
            </button>
          </div>
        </template>
      </whppt-table>
    </whppt-card>
    <whppt-dialog :is-active="itemToBeRemoved" :height="300" :width="800">
      <template v-slot:header>
        <whppt-toolbar>
          <h3>Warning, You are about to delete a file!</h3>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <div class="whppt-dialog__warning-message">
          <h4>Are you sure you want to delete this file?</h4>
          <p><em>Warning: Once you delete this file there is no way to recover it.</em></p>
        </div>
        <div class="whppt-dialog__warning-actions">
          <whppt-button danger @click="remove">Delete</whppt-button>
          <whppt-button flat @click="itemToBeRemoved = undefined">Cancel</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VTooltip } from 'v-tooltip';
import WhpptDialog from '../../../ui/Dialog';
import WhpptToolbar from '../../../ui/Toolbar';
import WhpptInput from '../../../ui/Input';
import WhpptTable from '../../../ui/Table';
import WhpptCard from '../../../ui/Card';
import WhpptButton from '../../../ui/Button';
import Save from '../../../icons/Save';
import LinkIcon from '../../../icons/ChainLink';
import Remove from '../../../icons/Trash';
import ExternalLink from '../../../icons/External';

export default {
  name: 'Test',
  directives: {
    VTooltip,
  },
  components: {
    WhpptDialog,
    WhpptToolbar,
    WhpptInput,
    WhpptTable,
    WhpptCard,
    WhpptButton,
    Save,
    Remove,
    LinkIcon,
    ExternalLink,
  },
  data: () => ({
    files: [],
    limit: 5,
    loading: false,
    currentPage: 1,
    itemToBeRemoved: false,
    file: { description: '', formData: undefined },
    total: 0,
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Description', align: 'start', value: 'description' },
        { text: 'Actions', align: 'start', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.loading = true;

    return this.loadFiles().then(() => (this.loading = false));
  },
  methods: {
    getUrl(file) {
      const baseUrl = window.location.origin;

      return encodeURI(`${baseUrl}/file/${file._id}/${file.name}`);
    },
    copyUrl(file) {
      const baseUrl = window.location.origin;
      const str = encodeURI(`${baseUrl}/file/${file._id}/${file.name}`);
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    remove() {
      return this.$axios.$post(`/file/removeFile`, { _id: this.itemToBeRemoved._id }).then(() => {
        this.itemToBeRemoved = undefined;
        this.loadFiles();
      });
    },
    upload(e) {
      this.file.formData = e.target.files[0];
    },
    save() {
      if (!this.file.formData) return;
      const formData = new FormData();
      const vm = this;

      formData.append('file', this.file.formData);
      formData.append('description', this.file.description);

      return this.$axios
        .$post(`/file/uploadFile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          vm.openEditor = false;
          vm.file = { description: '', formData: undefined };
          vm.loadFiles();
        });
    },
    saveFileDetails(file) {
      this.$axios.$post(`${this.$whppt.apiPrefix}/file/saveFileDetails`, file).then(() => {
        this.$toast.global.editorSuccess('File Details Updated');
      });
    },
    loadFiles() {
      this.loading = true;

      return this.$axios
        .$get(`${this.$whppt.apiPrefix}/file/loadFiles`, {
          params: { page: this.currentPage || 1, size: this.limit },
        })
        .then(({ files, total }) => {
          this.loading = false;
          this.files = files;
          this.total = total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-settings__file-actions {
  display: flex;

  button {
    cursor: pointer;
    background: none;
    border: none;
    margin: 0 0.5rem 0 0;
    padding: 0;
    color: inherit;

    &:hover {
      color: $primary-600;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}

.whppt-settings__file-form-actions {
  display: flex;
  margin-top: 0.5rem;

  button {
    margin-left: 0.5rem;

    &:first-of-type {
      margin-left: auto;
    }
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
}

.whppt-dialog__warning-message {
  margin-bottom: 1rem;
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
