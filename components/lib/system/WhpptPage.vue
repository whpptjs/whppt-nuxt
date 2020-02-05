<template>
  <div class="whppt-page">
    <h2>Create a Page</h2>
    <form class="whppt-page__form" @submit.prevent>
      <!-- <whppt-select v-model="newPage.template" :items="templates" label="Page Template: " /> -->

      <fieldset class="whppt-fieldset">
        <label for="template">Page Template: </label>
        <select id="template" v-model="newPage.template">
          <option class="whppt-page__form--black" value="" disabled>Select a Template</option>
          <option
            v-for="(template, index) in templates"
            :key="index"
            class="whppt-page__form--black"
            :value="template.key"
            >{{ template.label }}</option
          >
        </select>
      </fieldset>
      <!-- <fieldset class="whppt-fieldset">
        <label for="slug">Page Slug:</label>
        <input class="whppt-page__form--black" id="slug" v-model="newPage.slug" @blur="formatSlug" />
        <span class="whppt-page__hint">Enter any text and we'll turn it into a slug for you!</span>
      </fieldset> -->
      <whppt-input-text
        v-model="newPage.slug"
        label="Page Slug:"
        info="Enter any text and we'll turn it into a slug for you!"
      ></whppt-input-text>

      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptButton from '../../../components/lib/system/WhpptButton';
import WhpptSelect from './WhpptSelect';
import WhpptInputText from './InputText';

export default {
  name: 'WhpptPage',
  components: { WhpptButton, WhpptSelect, WhpptInputText },
  data: () => ({
    newPage: {
      template: -1,
      slug: '',
      header: {},
      contents: [],
      link: { type: 'page' },
      linkgroup: { type: 'page', links: [], showOnDesktop: true },
    },
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
      return vm.$whppt.createPage(vm.newPage).then(({ data }) => {
        const { slug } = data;
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
