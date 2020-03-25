<template>
  <div class="whppt-page">
    <p class="font-xl">Create a Page</p>

    <form class="whppt-page__form" @submit.prevent>
      <whppt-select v-model="template" :items="templates" label="Page Template" />
      <whppt-select v-model="pageType" :items="pageTypes" label="Page Type" />
      <component :is="pageType.name" v-if="pageType" />
      <whppt-text-input
        v-model="slug"
        label="Page Slug"
        info="Enter any text and we'll turn it into a slug for you!"
      ></whppt-text-input>
      <div class="whppt-info">Your slug: {{ formatSlug(slug) }}</div>
      <div v-if="showError">A page with that slug already exists, please select another.</div>

      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { map, filter, forEach } from 'lodash';
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptButton from '../../../components/lib/whpptComponents/WhpptButton';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';

const additionalComponents = {};

const types = global.$whppt.types;
const pageTypes = filter(types, t => t.pageTypes);

forEach(pageTypes, type => {
  additionalComponents[type.pageTypes.name] = type.pageTypes.component;
});

export default {
  name: 'WhpptPage',
  components: { ...additionalComponents, WhpptButton, WhpptSelect, WhpptTextInput },
  data: () => ({
    additionalComponents,
    template: undefined,
    pageType: undefined,
    slug: '',
    showError: false,
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    templates() {
      return this.$whppt.templates;
    },
    pageTypes() {
      return map(this.$whppt.types, t => t.pageTypes);
    },
  },
  mounted() {
    if (!this.page || !this.page._id) {
      this.slug = this.formatSlug(this.$router.currentRoute.path);
    }
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar']),
    saveNewPage() {
      const vm = this;
      vm.showError = false;
      if (!vm.slug || !vm.template) {
        const { slug, template } = vm;
        this.$toast.global.editorError(
          `Missing Fields: ${!slug ? 'Slug' : ''}${!vm.slug && !vm.template ? ', ' : ''}${!template ? 'Template' : ''}.`
        );
        return;
      }

      const newPage = {
        ...vm.page,
        ...vm.template.init,
        slug: this.formatSlug(vm.slug),
        template: vm.template.key,
        pageType: this.pageType && this.pageType.name,
        og: { title: '', keywords: '', image: { imageId: '', crop: {} } },
        twitter: { title: '', keywords: '', image: { imageId: '', crop: {} } },
      };

      return vm.$whppt.checkSlug({ slug: newPage.slug }).then(result => {
        if (result) {
          vm.showError = true;
        } else {
          return vm.$whppt.createPage(newPage).then(page => {
            const { slug } = page;
            vm.closeSidebar();
            if (`/${slug}` === vm.$router.currentRoute.path) {
              return vm.$router.go();
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

      if (this.pageType && this.pageType.formatSlug) return this.pageType.formatSlug({ page: this.page, slug });
      return slug;
    },
  },
};
</script>

<style>
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

.whppt-info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}
</style>
