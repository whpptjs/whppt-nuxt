<template>
  <div>
    <whppt-tabs ref="whpptLinkEditorTabs" :active-tab="activeTabIndex" @changed="tabChanged">
      <whppt-tab id="page" name="Page">
        <whppt-card>
          <div class="whppt-tab__info">
            Page links take the user to another page on this website
          </div>
          <div>
            <whppt-text-input
              id="link-editor-page-href"
              :value="link.href"
              placeholder="e.g. /contact"
              label="Hyperlink"
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'href' })"
            />
            <whppt-text-input
              id="link-editor-page-text"
              :value="link.text"
              placeholder="Link Text"
              label="Link Text"
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'text' })"
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
              :value="link.href"
              placeholder="e.g. https://example.com/example"
              label="Hyperlink"
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'href' })"
            />
            <whppt-text-input
              id="link-editor-external-text"
              :value="link.text"
              placeholder="Link Text"
              label="Link Text"
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'text' })"
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
              :value="link.href"
              placeholder="e.g. #museum"
              label="Hyperlink"
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'href' })"
            />
            <whppt-text-input
              id="link-editor-anchor-text"
              :value="link.text"
              placeholder="Link Text"
              label="Link Text"
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'text' })"
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
              @input="setSelectedComponentState({ value: $whppt.trim($event), path: 'text' })"
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
import { debounce, findIndex } from 'lodash';
import WhpptTextInput from '../ui/components/Input';
import WhpptSelect from '../ui/components/Select';
import WhpptTabs from '../ui/components/Tabs';
import WhpptTab from '../ui/components/Tab';
import WhpptCard from '../ui/components/Card';

export default {
  name: 'EditorLinkEdit',
  components: { WhpptTextInput, WhpptSelect, WhpptTabs, WhpptTab, WhpptCard },
  data: () => ({
    activeTabIndex: 0,
    search: '',
    files: [],
  }),
  computed: {
    ...mapState('whppt/editor', ['baseAPIUrl', 'baseFileUrl', 'selectedComponent']),
    link() {
      return this.selectedComponent.value[this.selectedComponent.property] || this.selectedComponent.value;
    },
  },
  watch: {
    search() {
      this.filterList();
    },
    'link.type'(val) {
      this.setActiveTabIndex(val);
    },
  },
  mounted() {
    this.filterList = debounce(() => this.queryFilesList(), 600);
    this.filterList();

    this.setActiveTabIndex(this.link.type);
  },
  methods: {
    ...mapActions('whppt/editor', ['setSelectedComponentState']),
    selectFile(item) {
      if (!item) return;

      this.setSelectedComponentState({ value: `/file/${item._id}`, path: 'href' });
      this.setSelectedComponentState({ value: item._id, path: 'fileId' });
    },
    queryFilesList() {
      const config = { params: { search: this.search } };

      return this.$axios.$get(`${this.$whppt.apiPrefix}/file/searchFiles`, config).then(({ files }) => {
        this.files = files;
      });
    },
    tabChanged(tab) {
      this.setSelectedComponentState({ value: tab.id, path: 'type' });
      this.setActiveTabIndex(tab.id);
    },
    setActiveTabIndex(tabId) {
      const tabIndex = findIndex(this.$refs.whpptLinkEditorTabs.$children, { id: tabId });

      this.activeTabIndex = tabIndex || 0;
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
