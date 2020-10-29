<template>
  <div>
    <whppt-card>
      <form @submit.prevent>
        <fieldset>
          <whppt-button
            v-if="!itemToBeRemoved"
            class="whppt-settings__button"
            style="display: flex"
            @click="openEditor = !openEditor"
          >
            {{ openEditor ? 'Back' : `Add File` }}
          </whppt-button>
          <whppt-button
            v-if="itemToBeRemoved"
            class="whppt-settings__button"
            style="display: flex"
            @click="itemToBeRemoved = undefined"
          >
            Close
          </whppt-button>
          <div v-if="!itemToBeRemoved">
            <div v-if="openEditor" style="margin-top: 30px;">
              <whppt-text-input
                :id="`${$options._scopeId}-settings-files-description`"
                v-model="file.description"
                label="File description"
                placeholder="Enter File Description"
                class="whppt-full"
              />
              <whppt-button class="whppt-settings__button" @click="$refs.fileInput.click()">
                <input ref="fileInput" type="file" style="display: none;" @input="upload" />
                <span>{{ file.formData ? file.formData.name : `Select File` }}</span>
              </whppt-button>
              <whppt-button @click="save">Upload</whppt-button>
            </div>
          </div>
        </fieldset>
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
        <template v-slot:item.actions="{ item }">
          <a target="_blank" :href="getUrl(item)">
            <external-link />
          </a>
          <button @click="copyUrl(item)">
            <link-icon />
          </button>
          <button @click="saveFileDetails(item)">
            <save />
          </button>
          <button @click="itemToBeRemoved = item">
            <remove />
          </button>
        </template>
      </whppt-table>
    </whppt-card>
    <div v-if="itemToBeRemoved">
      Are you sure you want to delete this item?
      <button class="whppt-settings__button" style="display: flex" @click="remove">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ceil } from 'lodash';
import { VTooltip } from 'v-tooltip';
import WhpptTextInput from '../../../ui/Input';
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
    WhpptTextInput,
    WhpptTable,
    WhpptCard,
    WhpptButton,
    Save,
    Remove,
    LinkIcon,
    ExternalLink,
  },
  data() {
    return {
      files: [],
      pages: 0,
      limit: 9,
      loading: false,
      currentPage: 1,
      openEditor: false,
      itemToBeRemoved: false,
      file: { description: undefined, formData: undefined },
      total: 0,
    };
  },
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
      return this.$api.post(`/file/removeFile`, { _id: this.itemToBeRemoved._id }).then(() => {
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
        .post(`/file/uploadFile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          vm.openEditor = false;
          vm.file = { description: undefined, formData: undefined };
          vm.loadFiles();
        });
    },
    saveFileDetails(file) {
      this.$api.post('/file/saveFileDetails', file).then(() => {
        this.$toast.global.editorSuccess('File Details Updated');
      });
    },
    loadFiles() {
      const vm = this;
      vm.loading = true;
      return this.$api
        .get(`/file/loadFiles`, {
          params: { currentPage: this.currentPage || 1, limit: this.limit },
        })
        .then(({ data: { files, total } }) => {
          vm.pages = ceil(total / this.limit);
          vm.loading = false;
          vm.files = files;
        })
        .catch(() => {
          vm.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.whppt-table__input {
  background: transparent;
  box-shadow: none;
}

.left-float {
  float: left;
}

.table-width {
  width: 100%;
}

.table-width tr th {
  padding: 0.5rem 0.2rem;
}
.table-width tr td {
  padding: 0.2rem 0.2rem 0rem;
}

.table-width tbody tr:nth-child(odd) {
  background: #efefef;
}
</style>
