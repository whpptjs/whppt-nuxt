<template>
  <div class="whppt-page">
    <h2>Create a Page</h2>
    <form class="whppt-page__form" @submit.prevent>
      <fieldset>
        <label for="template">Page Template: </label>
        <select id="template" v-model="newPage.template">
          <option value="" disabled>Select a Template</option>
          <option v-for="(template, index) in templates" :key="index" :value="template.key">{{
            template.label
          }}</option>
        </select>
      </fieldset>
      <fieldset>
        <label for="slug">Page Slug:</label>
        <input id="slug" v-model="newPage.slug" @blur="formatSlug" />
        <span class="whppt-page__hint">Enter any text and we'll turn it into a slug for you!</span>
      </fieldset>
      <whppt-button @click="saveNewPage">Create Page</whppt-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import slugify from 'slugify';
import WhpptButton from '../../../components/lib/system/WhpptButton';

export default {
  name: 'WhpptPage',
  components: { WhpptButton },
  data: () => ({
    newPage: {
      template: '',
      slug: '',
    },
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    templates() {
      return this.$whppt.templates;
    },
  },
  methods: {
    ...mapActions('whppt-nuxt/page', ['save']),
    saveNewPage() {
      return this.save(this.newPage).then(({ data }) => {
        const { slug } = data;
        return this.$router.push(`/${slug}` || '/');
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
.whppt-page {
}

.whppt-page__form {
}

.whppt-page__form fieldset {
  border: 0;
  padding: 0;
  margin: 1rem 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.whppt-page__form label {
  margin-bottom: 0.5rem;
}

.whppt-page__hint {
  margin-top: 0.3rem;
  font-size: 0.7rem;
}
</style>
