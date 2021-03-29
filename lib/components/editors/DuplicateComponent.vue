<template>
  <div class="whppt-clone-editor">
    <div class="whppt-clone-editor__field">
      <whppt-autocomplete
        v-model="selectedPageType"
        :items="pageTypes"
        item-text="label"
        item-value="collection"
        label="Select a page type"
        placeholder="Start typing..."
        @select="loadAllPages"
      />
    </div>
    <div v-if="pages && pages.length" class="whppt-clone-editor__field">
      <whppt-autocomplete
        v-model="selectedPage"
        label="Select a Page"
        :items="pages"
        item-text="slug"
        item-value="_id"
        placeholder="Start typing..."
        info="Search for a page by slug to clone the component into"
        @select="setCloneInto"
      />
    </div>
    <div v-if="selectedPageContentSection && selectedPageContentSection.length" class="whppt-clone-editor__field">
      <whppt-select
        v-model="cloneInto"
        :items="selectedPageContentSection"
        label="Select a location"
        info="Select which content location you want to clone this component into."
      />
    </div>
    <div class="whppt-clone-editor__field whppt-clone-editor__button">
      <whppt-button :disabled="!selectedPageType && !selectedPage" @click="duplicateComponent">
        Duplicate Component
      </whppt-button>
    </div>
  </div>
</template>

<script>
import { filter, map, find } from 'lodash';
import { mapState } from 'vuex';
import WhpptAutocomplete from '../ui/components/Autocomplete';
import WhpptSelect from '../ui/components/Select';
import WhpptButton from '../ui/components/Button';

export default {
  name: 'DuplicateComponentEditor',
  components: {
    WhpptAutocomplete,
    WhpptSelect,
    WhpptButton,
  },
  data: () => ({
    pages: [],
    selectedPageType: '',
    selectedPage: '',
    loadingPages: false,
    cloneInto: '',
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['selectedComponent']),
    pageTypes() {
      const plugins = this.$whppt.plugins;
      const pageTypePlugins = filter(plugins, plugin => plugin.pageType);

      return map(pageTypePlugins, plugin => ({
        name: plugin.pageType.name,
        label: plugin.pageType.label,
        collection: plugin.pageType.collection ? plugin.pageType.collection.name : plugin.pageType.name,
        contentSections: plugin.pageType.contentSections || [],
      }));
    },
    selectedPageContentSection() {
      if (!this.selectedPage) return false;

      const pageType = find(this.pageTypes, pt => pt.name === this.selectedPage.pageType);

      return (pageType && pageType.contentSections) || [];
    },
  },
  methods: {
    setCloneInto() {
      if (this.selectedPageContentSection && this.selectedPageContentSection.length === 1) {
        this.cloneInto = this.selectedPageContentSection[0];
      }
    },
    loadAllPages() {
      this.selectedPage = '';
      this.cloneInto = '';

      if (!this.selectedPageType && !this.selectedPageType.collection) return;

      this.loadingPages = true;

      this.$axios
        .$get(`${this.$whppt.apiPrefix}/page/list?collection=${this.selectedPageType.collection}`)
        .then(pages => {
          this.loadingPages = false;

          this.pages = map(pages, page => ({
            _id: page._id,
            slug: `/${page.slug}`,
            pageType: page.pageType,
          }));
        })
        .catch(err => {
          this.pages = [];
          this.loadingPages = false;
          throw err;
        });
    },
    duplicateComponent() {
      const params = {
        pageId: this.selectedPage._id,
        collection: this.selectedPageType.collection,
        cloneInto: this.cloneInto || undefined,
        component: this.selectedComponent.value,
      };

      this.$axios
        .$post(`${this.$whppt.apiPrefix}/page/cloneComponent`, params)
        .then(() => this.$toast.global.editorSuccess('Component successfully duplicated'))
        .catch(err => this.$toast.global.editorError(err.response.data.error.message));
    },
  },
};
</script>

<style lang="scss" scoped>
.whppt-clone-editor {
  &__field {
    margin-bottom: 1rem;
  }

  &__button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
