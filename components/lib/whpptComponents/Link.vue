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
          <whppt-text-input
            v-model="data.href"
            class="whppt-input-half"
            placeholder="e.g. #museum"
            label="Hyperlink"
            info
            text-
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
          Anchors refer to identifying elements on the page using a #. Clicking on a anchor will scroll the page down to
          it.
        </div>
      </div>
      <div v-if="data.type === 'file'">
        <div class="whppt-input-half">Selected File Url:</div>
        <div class="whppt-input-half" style="margin-bottom: 30px;">{{ data.href }}</div>
        <whppt-text-input v-model="data.text" class="whppt-input-half" placeholder="Link Text" label="Link Text" info />
        <whppt-text-input
          v-model="search"
          class="whppt-input-half"
          style="margin-top: 40px;"
          placeholder="file"
          label="Search File"
          info
        />
        <table style="margin: 10px 0; width: 100%">
          <tr>
            <th>File Name</th>
          </tr>
          <tr
            v-for="(file, index) in files"
            :key="index"
            @click="selectFile(file)"
            class="selectedRow"
            :class="{ selectedRowHover: file._id === data.fileId }"
          >
            <button style="width: 100%;padding: 5px;">
              <td>
                {{ file.name }}
              </td>
            </button>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { debounce } from 'lodash';
import ETab from './Tab';
import WhpptTextInput from './WhpptTextInput';
import WhpptCheckBox from './CheckBox';

export default {
  name: 'EditorLinkEdit',
  components: { WhpptTextInput, ETab, WhpptCheckBox },
  props: ['data'],
  data() {
    return {
      search: '',
      files: [],
    };
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'baseFileUrl']),
  },
  methods: {
    selectFile(item) {
      this.data.href = `${this.baseFileUrl ? this.baseFileUrl : ''}/file/getFile/${item._id}`;
      this.data.fileId = item._id;
    },
    isTypeOf(value) {
      return typeof value !== 'undefined';
    },
    queryFilesList() {
      return this.$axios
        .get(`/file/searchFiles`, {
          params: { search: this.search },
        })
        .then(({ data: { files } }) => {
          this.files = files;
        });
    },
  },
  mounted() {
    this.filterList = debounce(() => this.queryFilesList(), 600);
    this.filterList();
  },
  watch: {
    search() {
      this.filterList();
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

.selectedRow :hover {
  color: black;
  background-color: white;
}
.selectedRowHover {
  color: black;
  background-color: white;
}
</style>
