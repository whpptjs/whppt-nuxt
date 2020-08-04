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
      <div v-if="!itemToBeRemoved">
        <table v-if="!openEditor">
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
import { VTooltip } from 'v-tooltip';
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';
import Save from '../../../icons/Save';
import LinkIcon from '../../../icons/Link';
import Remove from '../../../icons/Remove';
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
      limit: 9,
      currentPage: 1,
      openEditor: false,
      itemToBeRemoved: false,
      file: { description: undefined, formData: undefined },
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  mounted() {
    this.loading = true;
    return this.loadFiles().then(() => (this.loading = false));
  },
  methods: {
    getUrl(file) {
      const baseUrl = window.location.origin;
      return `${baseUrl}/file/${file._id}/${file.name}`;
    },
    copyUrl(file) {
      const baseUrl = window.location.origin;
      const str = `${baseUrl}/file/getFile/${file._id}/${file.name}`;
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
    loadFiles(currentPage) {
      this.currentPage = currentPage || 1;
      return this.$api
        .get(`/file/loadFiles`, {
          params: { currentPage: this.currentPage, limit: this.limit },
        })
        .then(({ data: { files } }) => {
          this.files = files;
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

table {
  width: 100%;
}

table tr th {
  padding: 0.5rem 0.2rem;
}
table tr td {
  padding: 0.2rem 0.2rem 0rem;
}

table tbody tr:nth-child(odd) {
  background: #efefef;
}
</style>
