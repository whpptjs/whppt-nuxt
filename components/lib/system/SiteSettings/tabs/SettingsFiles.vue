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
        <!-- <button @click="$refs.fileInput.click()">
          <input ref="fileInput" type="file" style="display: none;" @input="upload" />
          <span>+</span>
        </button> -->
      </div>
      <div v-if="!itemToBeRemoved">
        <table style="margin-top:10px; width: 100%;" v-if="!openEditor">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          <tr></tr>
          <tr v-for="(file, index) in files" :key="index" style="padding: 5px">
            <td>{{ file.name }}</td>
            <td>{{ file.description }}</td>
            <td>
              <button @click="itemToBeRemoved = file">
                <span>Remove</span>
              </button>
            </td>
          </tr>
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

export default {
  name: 'test',
  mounted() {
    this.loading = true;
    return this.loadFiles().then(() => (this.loading = false));
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
  components: {
    WhpptTextInput,
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
  },
  methods: {
    remove() {
      const vm = this;
      return this.$axios.post(`${this.baseAPIUrl}/file/removeFile`, { _id: this.itemToBeRemoved._id }).then(() => {
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
        .post(`${this.baseAPIUrl}/file/uploadFile`, formData, {
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
    loadFiles(currentPage) {
      this.currentPage = currentPage || 1;
      return this.$axios
        .get(`${this.baseAPIUrl}/api/file/loadFiles`, {
          params: { currentPage: this.currentPage, limit: this.limit },
        })
        .then(({ data: { files } }) => {
          this.files = files;
        });
    },
  },
};
</script>
