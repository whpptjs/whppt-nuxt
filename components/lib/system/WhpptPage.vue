<template>
  <div class="whppt-page">
    <p class="font-xl">Create a Page</p>

    <form class="whppt-page__form" @submit.prevent>
      <whppt-select v-model="template" :items="templates" label="Page Template:" />

      <whppt-text-input
        v-model="slug"
        label="Page Slug:"
        info="Enter any text and we'll turn it into a slug for you!"
      ></whppt-text-input>
      <div class="whppt-info">Your slug: {{ formatSlug(slug) }}</div>
      <div v-if="showError">A page with that slug already exists, please select another.</div>

      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptButton from '../../../components/lib/whpptComponents/WhpptButton';
import WhpptTextInput from '../whpptComponents/WhpptTextInput';
import WhpptSelect from '../whpptComponents/WhpptSelect';

export default {
  name: 'WhpptPage',
  components: { WhpptButton, WhpptSelect, WhpptTextInput },
  data: () => ({
    template: undefined,
    slug: '',
    title: '',
    showError: false,
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    templates() {
      return this.$whppt.templates;
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
      // TODO: Need to show a message on screen
      if (!vm.slug || !vm.template) return;

      const newPage = {
        slug: this.formatSlug(vm.slug),
        template: vm.template.key,
        ...vm.template.init,
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
