<template>
  <div class="whppt-page">
    <h2>Create a Page</h2>
    <form class="whppt-page__form" @submit.prevent>
      <whppt-select v-model="template" :items="templates" label="Page Template:" />

      <whppt-text-input
        v-model="slug"
        label="Page Slug:"
        info="Enter any text and we'll turn it into a slug for you!"
      ></whppt-text-input>

      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptButton from '../../../components/lib/system/WhpptButton';
import WhpptSelect from './WhpptSelect';
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'WhpptPage',
  components: { WhpptButton, WhpptSelect, WhpptTextInput },
  data: () => ({
    template: undefined,
    slug: '',
    title: '',
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    templates() {
      return this.$whppt.templates;
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['closeSidebar']),
    saveNewPage() {
      const vm = this;
      // TODO: Need to show a message on screen
      if (!vm.slug || !vm.template) return;

      const newPage = {
        slug: vm.slug,
        template: vm.template.key,
        ...vm.template.init,
      };

      return vm.$whppt.createPage(newPage).then(page => {
        console.log('TCL: saveNewPage -> page', page);
        const { slug } = page;
        vm.closeSidebar();
        return vm.$router.push(`/${slug}` || '/');
      });
    },
    formatSlug() {
      if (this.newPage.slug.startsWith('/')) this.newPage.slug = this.newPage.slug.replace(/^(\/*)/, '');
      this.newPage.slug = slugify(this.newPage.slug, { remove: '^[a-z](-?[a-z])*$', lower: true });
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
</style>
