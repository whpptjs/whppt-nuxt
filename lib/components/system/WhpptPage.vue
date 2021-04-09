<template>
  <div class="whppt-page">
    <form class="whppt-page__form" @submit.prevent>
      <whppt-field>
        <whppt-select
          id="pageType"
          v-model="pageForm.pageType"
          :items="pageTypes"
          item-text="label"
          item-value="name"
          label="Page Type"
          return-object
          placeholder="Select a page type"
        />
      </whppt-field>

      <whppt-select
        v-if="
          selectedPageTypePlugin &&
            selectedPageTypePlugin.pageType &&
            selectedPageTypePlugin.pageType.templates.length > 1
        "
        :id="`${$options._scopeId}-whppt-page`"
        v-model="pageForm.template"
        :items="selectedPageTypePlugin.pageType.templates"
        item-text="label"
        item-value="key"
        label="template"
      ></whppt-select>

      <component :is="pageForm.pageType.name" v-if="pageForm.pageType" :page="pageForm" />

      <whppt-field>
        <whppt-text-input
          id="page-slug"
          v-model="pageForm.slug"
          label="Page Slug"
          info="Enter any text and we'll turn it into a slug for you!"
        ></whppt-text-input>
      </whppt-field>
      <div class="whppt-slug">Your slug: {{ formatSlug(pageForm.slug) }}</div>
      <div v-if="showError" class="whppt-error-message">
        A page with that slug already exists, please select another.
      </div>

      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { map, filter, forEach, find, get } from 'lodash';
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptSelect from '../ui/components/Select';
import WhpptTextInput from '../ui/components/Input';
import WhpptButton from '../ui/components/Button';
import WhpptField from '../ui/components/Field';

const additionalComponents = {};

const plugins = global.$whppt.plugins;
const pageTypePlugins = filter(plugins, t => t.pageType);

forEach(pageTypePlugins, plugin => {
  if (plugin.pageType.component) additionalComponents[plugin.pageType.name] = plugin.pageType.component;
});

export default {
  name: 'WhpptPage',
  components: { ...additionalComponents, WhpptSelect, WhpptTextInput, WhpptButton, WhpptField },
  data: () => ({
    additionalComponents,
    showError: false,
    pageForm: {
      slug: '',
      template: '',
      pageType: '',
    },
    selectTest: '',
  }),
  computed: {
    ...mapState('whppt/page', ['page']),
    ...mapState('whppt/config', ['domain']),
    pageTypes() {
      return map(pageTypePlugins, t => t.pageType);
    },
    selectedPageTypePlugin() {
      return find(pageTypePlugins, plugin => plugin.pageType.name === get(this.pageForm, 'pageType.name'));
    },
  },
  methods: {
    ...mapActions('whppt/editor', ['closeSidebar']),
    ...mapActions('whppt/page', ['checkSlug']),
    saveNewPage() {
      const vm = this;

      vm.showError = false;
      if (!this.pageForm.slug) {
        this.$toast.global.editorError(`Missing Field: Slug.`);
        return;
      }
      if (!this.pageForm.pageType) {
        this.$toast.global.editorError(`Missing Fields: Page Type.`);
        return;
      }
      if (!this.domain._id) {
        this.$toast.global.editorError(`No domain found.`);
        return;
      }

      const newPage = {
        slug: this.formatSlug(vm.pageForm.slug),
        domainId: this.domain._id,
        pageType: this.pageForm.pageType && this.pageForm.pageType.name,
        og: { title: '', keywords: '', image: { imageId: '', crop: {} } },
        twitter: { title: '', keywords: '', image: { imageId: '', crop: {} } },
        contents: [],
      };

      if (
        this.selectedPageTypePlugin &&
        this.selectedPageTypePlugin.pageType.templates &&
        this.selectedPageTypePlugin.pageType.templates.length === 1
      ) {
        this.pageForm.template = this.selectedPageTypePlugin.pageType.templates[0].key;
      }

      if (!this.pageForm.template) {
        this.$toast.global.editorError(`Missing Field: Template.`);
        return;
      }

      return vm
        .checkSlug({ slug: newPage.slug, pageType: newPage.pageType, domainId: this.domain._id })
        .then(result => {
          if (result) {
            vm.showError = true;
          } else {
            return this.pageForm.pageType
              .createPage(vm.$whppt.context, {
                page: newPage,
                form: vm.pageForm,
              })
              .then(page => {
                const { slug } = page;
                vm.closeSidebar();
                if (`/${slug}` === vm.$router.currentRoute.path) {
                  // return vm.$router.go();
                }
                this.$toast.global.editorSuccess('Page Successfully Created!');
                return vm.$router.push(`/${slug}` || '/');
              });
          }
        });
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');

      if (this.pageForm.pageType && this.pageForm.pageType.formatSlug)
        return this.pageForm.pageType.formatSlug({ page: this.pageForm, slug });
      return slug;
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-500: #a0aec0;
$danger-600: #e53e3e;

.whppt-page__form--black {
  color: black;
}

.whppt-page__form label {
  margin-bottom: 0.5rem;
}

.whppt-page__hint {
  margin-top: 0.3rem;
  font-size: 0.7rem;
}

.whppt-slug {
  font-size: 0.75rem;
  font-style: italic;
  color: $gray-500;
  margin-bottom: 0.5rem;
}

.whppt-error-message {
  color: $danger-600;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.5rem;
}
</style>
