<template>
  <div>
    <whppt-tabs @changed="tabChanged">
      <whppt-tab id="page" name="Page">
        <whppt-card>
          <div class="whppt-tab__info">
            Page links take the user to another page on this website
          </div>
          <div>
            <whppt-text-input
              id="link-editor-page-href"
              v-model="link.href"
              class="whppt-input-half"
              placeholder="e.g. /contact"
              label="Hyperlink"
            />
            <whppt-text-input
              id="link-editor-page-text"
              v-model="link.text"
              class="whppt-input-half"
              placeholder="Link Text"
              label="Link Text"
            />
          </div>
        </whppt-card>
      </whppt-tab>
      <whppt-tab id="external" name="External">
        <whppt-card>
          <div class="whppt-tab__info">
            External links open a new tab to another website. Examples: https://example.com or mailto:example@mail.com
          </div>
          <div>
            <whppt-text-input
              id="link-editor-external-href"
              v-model="link.href"
              class="whppt-input-half"
              placeholder="e.g. https://example.com/example"
              label="Hyperlink"
            />
            <whppt-text-input
              id="link-editor-external-text"
              v-model="link.text"
              class="whppt-input-half"
              placeholder="Link Text"
              label="Link Text"
            />
          </div>
        </whppt-card>
      </whppt-tab>
      <whppt-tab id="anchor" name="Anchor">
        <whppt-card>
          <div class="whppt-tab__info">
            Anchors refer to identifying elements on the page using a #. Clicking on a anchor will scroll the page down
            to it.
          </div>
          <div>
            <whppt-text-input
              id="link-editor-anchor-href"
              v-model="link.href"
              class="whppt-input-half"
              placeholder="e.g. #museum"
              label="Hyperlink"
            />
            <whppt-text-input
              id="link-editor-anchor-text"
              :value="link.text"
              placeholder="Link Text"
              label="Link Text"
              @input="setSelectedComponentState({ value: $event })"
            />
          </div>
        </whppt-card>
      </whppt-tab>
      <whppt-tab id="file" name="File">
        <whppt-card>
          <div class="selected-file">Selected File Url: {{ link.href }}</div>
          <div>
            <whppt-text-input
              id="link-editor-file-text"
              :value="link.text"
              placeholder="Link Text"
              label="Link Text"
              @input="setSelectedComponentState({ value: $event, path: 'text' })"
            />
            <whppt-select
              id="link-editor-file-select"
              label="File"
              :items="files"
              :value="link.fileId"
              item-text="name"
              item-value="_id"
              return-object
              placeholder="Select a file"
              @input="selectFile"
            ></whppt-select>
          </div>
        </whppt-card>
      </whppt-tab>
    </whppt-tabs>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { clone, debounce } from 'lodash';
import WhpptTextInput from '../ui/Input';
import WhpptSelect from '../ui/Select';
import WhpptTabs from '../ui/Tabs';
import WhpptTab from '../ui/Tab';
import WhpptCard from '../ui/Card';

export default {
  name: 'EditorLinkEdit',
  components: { WhpptTextInput, WhpptSelect, WhpptTabs, WhpptTab, WhpptCard },
  data: () => ({
    search: '',
    files: [],
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl', 'baseFileUrl', 'selectedComponent']),
    link() {
      return this.selectedComponent.value[this.selectedComponent.property] || this.selectedComponent.value;
    },
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
    ...mapActions('whppt-nuxt/editor', ['setSelectedComponentState']),
    selectFile(item) {
      if (!item) return;

      const baseUrl = this.baseFileUrl ? this.baseFileUrl : window.location.origin;

      this.setSelectedComponentState({ value: `${baseUrl}/file/${item._id}`, path: 'href' });
      this.setSelectedComponentState({ value: item._id, path: 'fileId' });
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
    tabChanged(tab) {
      const link = clone(this.link);
      link.type = tab.id;
      this.setSelectedComponentState({ value: link });
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-file {
  margin: 0.5rem 0;
}

.whppt-tab__info {
  color: gray;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  font-style: italic;
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
