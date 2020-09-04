<template>
  <form @submit.prevent>
    <fieldset>
      <div style="display:flex; justify-content: space-between;">
        <div style="font-weight: bold; margin-right:40px;">Files</div>
        <button
          v-if="!itemToBeRemoved"
          class="whppt-settings__button"
          style="display: flex"
          @click="openEditor = !openEditor"
        >
          {{ openEditor ? 'Back' : `Add File` }}
        </button>
        <button
          v-if="itemToBeRemoved"
          class="whppt-settings__button"
          style="display: flex"
          @click="itemToBeRemoved = undefined"
        >
          Close
        </button>
      </div>
      <div class="whppt-flex-start whppt-align-center">
        <div
          v-for="index in pagesArray"
          :key="`page-${index}`"
          class="whppt-redirects__page"
          :class="index === currentPage ? 'whppt-redirects__page-selected' : ''"
          style="display: flex"
          @click="changePage(index)"
        >
          {{ index }}
        </div>
      </div>
      <div v-if="!itemToBeRemoved">
        <table v-if="!openEditor || !loading" class="table-width">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Description</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_file, index) in files" :key="index">
              <td class="mr-2">
                <label>
                  <input v-model="_file.name" type="text" class="whppt-table__input" placeholder="–" />
                </label>
              </td>
              <td class="mr-2">
                <label>
                  <input v-model="_file.description" type="text" class="whppt-table__input" placeholder="–" />
                </label>
              </td>
              <td>
                <div class="inline-block">
                  <a class="whppt-settings__tooltip" target="_blank" :href="getUrl(_file)">
                    <span class="whppt-settings__tooltip-text">View</span>
                    <external-link />
                  </a>
                </div>
                <button class="whppt-settings__tooltip" @click="copyUrl(_file)">
                  <span class="whppt-settings__tooltip-text">Copy Url</span>
                  <link-icon />
                </button>
                <button class="whppt-settings__tooltip" @click="saveFileDetails(_file)">
                  <span class="whppt-settings__tooltip-text">Save</span>

                  <save />
                </button>
                <button class="whppt-settings__tooltip" @click="itemToBeRemoved = _file">
                  <span class="whppt-settings__tooltip-text">Remove</span>

                  <remove />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="loading" style="margin-top: 30px;">
          Loading...
        </div>
        <div v-if="openEditor" style="margin-top: 30px;">
          <whppt-text-input v-model="file.description" placeholder="File description" class="whppt-full" />
          <button class="whppt-settings__button" @click="$refs.fileInput.click()">
            <input ref="fileInput" type="file" style="display: none;" @input="upload" />
            <span>{{ file.formData ? file.formData.name : `Select File` }}</span>
          </button>
          <div>
            <button class="whppt-settings__button" style="margin-top:30px;" @click="save">
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="itemToBeRemoved">
        Are you sure you want to delete this item?
        <button class="whppt-settings__button" style="display: flex" @click="remove">
          Confirm
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { ceil } from 'lodash';
import { VTooltip } from 'v-tooltip';
import WhpptTextInput from '../../../editors/WhpptTextInput';
import Save from '../../../icons/Save';
import LinkIcon from '../../../icons/Link';
import Remove from '../../../icons/Trash';
import ExternalLink from '../../../icons/External';

export default {
  name: 'Test',
  directives: {
    VTooltip,
  },
  components: {
    WhpptTextInput,
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
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    pagesArray() {
      const length = [];
      for (let i = 1; i <= this.pages; i++) {
        length.push(i);
      }

      return length;
    },
  },
  mounted() {
    this.loading = true;
    return this.loadFiles().then(() => (this.loading = false));
  },
  methods: {
    changePage(value) {
      this.currentPage = value;
      this.loadFiles();
    },
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
      const vm = this;
      return this.$api.post(`/file/removeFile`, { _id: this.itemToBeRemoved._id }).then(() => {
        vm.itemToBeRemoved = undefined;
        vm.loadFiles();
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
