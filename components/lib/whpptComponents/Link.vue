<template>
  <div>
    <div v-if="data">
      <ul class="whppt-tabs">
        <e-tab :active="data.type === 'page'" @click="data.type = 'page'">Page</e-tab>
        <e-tab :active="data.type === 'external'" @click="data.type = 'external'">External</e-tab>
        <e-tab :active="data.type === 'anchor'" @click="data.type = 'anchor'">Anchor</e-tab>
        <e-tab :active="data.type === 'file'" @click="data.type = 'file'">File</e-tab>
      </ul>

      <div v-if="data.type === 'page'">
        <div class="whppt-flex">
          <whppt-text-input
            id="linkHref"
            v-model="data.href"
            class="whppt-input-half"
            placeholder="e.g. /contact"
            label="Hyperlink"
          />
          <whppt-text-input
            id="linkText"
            v-model="data.text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          Page links take the user to another page on this website
        </div>
      </div>
      <div v-if="data.type === 'external'">
        <div class="whppt-flex">
          <whppt-text-input
            id="linkHref"
            v-model="data.href"
            class="whppt-input-half"
            placeholder="e.g. https://example.com/example"
            label="Hyperlink"
          />
          <whppt-text-input
            id="linkText"
            v-model="data.text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          External links open a new tab to another website. Examples: https://example.com or mailto:example@mail.com
        </div>
      </div>
      <div v-if="data.type === 'anchor'">
        <div class="whppt-flex">
          <whppt-text-input v-model="data.href" class="whppt-input-half" placeholder="e.g. #museum" label="Hyperlink" />
          <whppt-text-input
            id="linkText"
            v-model="data.text"
            class="whppt-input-half"
            placeholder="Link Text"
            label="Link Text"
          />
        </div>
        <div class="whppt-tabs__info">
          Anchors refer to identifying elements on the page using a #. Clicking on a anchor will scroll the page down to
          it.
        </div>
      </div>
      <div v-if="data.type === 'file'">
        <div class="whppt-input-half">Selected File Url:</div>
        <div class="whppt-input-half" style="margin-bottom: 30px;">{{ data.href }}</div>
        <whppt-text-input v-model="data.text" class="whppt-input-half" placeholder="Link Text" label="Link Text" />

        <whppt-select
          class="whppt-input-half mt-2"
          key-prop="_id"
          :value="data.fileId"
          label="File"
          value-prop="name"
          :items="files"
          @input="selectFile"
        ></whppt-select>

        <!-- <whppt-text-input
          v-model="search"
          class="whppt-input-half"
          style="margin-top: 40px;"
          placeholder="file"
          label="Search File"
        />
        <table class="whppt-files">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tr
            v-for="(file, index) in files"
            :key="index"
            class="selectedRow"
            :class="{ selectedRowHover: file._id === data.fileId }"
            @click="selectFile(file)"
          >
            <td>{{ file.name }}</td>
            <td>{{ file.fileType ? file.fileType.ext : '–' }}</td>
          </tr>
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { debounce } from 'lodash';
import ETab from './Tab';
import WhpptTextInput from './WhpptTextInput';
import WhpptSelect from './WhpptSelect';

export default {
  name: 'EditorLinkEdit',
  components: { WhpptTextInput, ETab, WhpptSelect },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    search: '',
    files: [],
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'baseFileUrl']),
  },
  watch: {
    search() {
      this.filterList();
    },
  },
  mounted() {
    this.filterList = debounce(() => this.queryFilesList(), 600);
    this.filterList();
  },
  methods: {
    selectFile(item) {
      if (!item) {
        this.data.href = undefined;
        this.data.fileId = '';
        return;
      }
      const baseUrl = this.baseFileUrl ? this.baseFileUrl : window.location.origin;

      this.data.href = `${baseUrl}/file/${item._id}`;
      this.data.fileId = item._id;
    },
    isTypeOf(value) {
      return typeof value !== 'undefined';
    },
    queryFilesList() {
      return this.$api
        .get(`/file/searchFiles`, {
          params: { search: this.search },
        })
        .then(({ data: { files } }) => {
          this.files = files;
        });
    },
  },
};
</script>

<style scoped>
.whppt-tabs {
  display: flex;
  padding-bottom: 1.5rem;
  padding-left: 0;
}

.whppt-tabs__info {
  padding: 0 1.25rem;
  color: gray;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  font-style: italic;
}

.whppt-input-half {
  padding: 0 0.5rem;
}

.whppt-files {
  margin: 10px;
}

.selectedRow:nth-child(even) {
  background-color: #5a5a5a;
}

.selectedRow:hover {
  color: black;
  background-color: white;
}

.whppt-files .selectedRowHover {
  color: black;
  background-color: white;
}
</style>
