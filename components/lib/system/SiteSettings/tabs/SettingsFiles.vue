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
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_file, index) in files" :key="index">
              <td>
                <label>
                  <input v-model="_file.name" type="text" class="whppt-table__input" placeholder="–" />
                </label>
              </td>
              <td>
                <label>
                  <input v-model="_file.description" type="text" class="whppt-table__input" placeholder="–" />
                </label>
              </td>
              <td>
                <button @click="saveFileDetails(_file)">
                  <save />
                </button>
                <button @click="itemToBeRemoved = _file">
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
import WhpptTextInput from '../../../whpptComponents/WhpptTextInput';
import Save from '../../../icons/Save';
import Remove from '../../../icons/Remove';

export default {
  name: 'Test',
  components: {
    WhpptTextInput,
    Save,
    Remove,
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
  border: none;
  box-shadow: none;
}

table {
  width: 100%;
}

table tr th,
table tr td {
  padding: 0.5rem 0.2rem;
}

table tbody tr:nth-child(odd) {
  background: #efefef;
}
</style>
