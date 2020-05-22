<template>
  <div class="whppt-page">
    <p class="font-xl">Create a Page</p>

    <form class="whppt-page__form" @submit.prevent>
      <whppt-select v-model="pageForm.pageType" :items="pageTypes" label="Page Type" />
      <!-- <whppt-select
        v-if="pageForm.pageType.templates && pageForm.pageType.templates.length > 1"
        v-model="pageForm.template"
        :items="pageForm.pageType.templates"
        label="Page Template"
      /> -->
      <component :is="pageForm.pageType.name" v-if="pageForm.pageType" :new-page="pageForm" />
      <whppt-text-input
        v-model="pageForm.slug"
        label="Page Slug"
        info="Enter any text and we'll turn it into a slug for you!"
      ></whppt-text-input>
      <div class="whppt-info">Your slug: {{ formatSlug(pageForm.slug) }}</div>
      <div v-if="showError">A page with that slug already exists, please select another.</div>

      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { map, filter, forEach } from 'lodash';
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptButton from '../../../../components/lib/whpptComponents/WhpptButton';
import WhpptTextInput from '../../whpptComponents/WhpptTextInput';
import WhpptSelect from '../../whpptComponents/WhpptSelect';

const additionalComponents = {};

const plugins = global.$whppt.plugins;
const pageTypePlugins = filter(plugins, t => t.pageType);

forEach(pageTypePlugins, plugin => {
  if (plugin.pageType.component) additionalComponents[plugin.pageType.name] = plugin.pageType.component;
});

export default {
  name: 'WhpptPage',
  components: { ...additionalComponents, WhpptButton, WhpptSelect, WhpptTextInput },
  data: () => ({
    additionalComponents,
    showError: false,
    pageForm: {
      slug: '',
      template: '',
      pageType: '',
    },
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    templates() {
      return this.$whppt.templates;
    },
    pageTypes() {
      return map(pageTypePlugins, t => t.pageType);
    },
  },
  // mounted() {
  //   if (!this.page || !this.page._id) {
  //     this.pageForm.slug = this.formatSlug(this.$router.currentRoute.path);
  //   }
  // },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar']),
    saveNewPage() {
      const vm = this;
      vm.showError = false;
      if (!vm.pageForm.slug) {
        // const { slug } = vm.pageForm;
        this.$toast.global.editorError(`Missing Field: Slug.`);
        return;
      }
      if (!vm.pageForm.pageType) {
        // const { pageType } = vm.pageForm;
        this.$toast.global.editorError(`Missing Fields: Page Type.`);
        return;
      }

      if (vm.pageForm.pageType.name === 'page' && !vm.pageForm.template) {
        // const { pageType } = vm.pageForm;
        this.$toast.global.editorError(`Missing Field: Template.`);
        return;
      }

      const newPage = {
        // ...vm.pageForm,
        // ...vm.pageForm.template.init,
        slug: this.formatSlug(vm.pageForm.slug),
        // template: vm.pageForm.template.key,
        pageType: this.pageForm.pageType && this.pageForm.pageType.name,
        og: { title: '', keywords: '', image: { imageId: '', crop: {} } },
        twitter: { title: '', keywords: '', image: { imageId: '', crop: {} } },
      };

      // if (vm.pageForm.template) {
      //   newPage = { ...newPage, ...vm.pageForm.template.init };
      // }

      return vm.$whppt.checkSlug({ slug: newPage.slug }).then(result => {
        if (result) {
          vm.showError = true;
        } else {
          return this.pageForm.pageType
            .createPage(vm.$whppt.context, { page: newPage, form: vm.pageForm })
            .then(page => {
              const { slug } = page;
              vm.closeSidebar();
              if (`/${slug}` === vm.$router.currentRoute.path) {
                return vm.$router.go();
              }
              this.$toast.global.editorSuccess('Page Successfully Created!');
              return vm.$router.push(`/${slug}` || '/');
            });
          // return vm.$whppt.createPage(newPage).then(page => {
          //   const { slug } = page;
          //   vm.closeSidebar();
          //   if (`/${slug}` === vm.$router.currentRoute.path) {
          //     return vm.$router.go();
          //   }
          //   this.$toast.global.editorSuccess('Page Successfully Created!');
          //   return vm.$router.push(`/${slug}` || '/');
          // });
        }
      });
    },
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');

      if (this.pageForm.pageType && this.pageForm.pageType.formatSlug)
        // issue here with this.page
        return this.pageForm.pageType.formatSlug({ page: this.pageForm, slug });
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
