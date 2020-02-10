<template>
  <div v-if="page" class="container">
    <div v-plain-text="page">
      {{ page.title || 'HEY' }}
    </div>
    <div v-content="page.contents" data-components="wPlainText, wRichText, wEditImage" class="whppt-contents">
      <component
        v-for="(content, index) in page.contents"
        :is="content.displayType"
        :key="index"
        :value="content"
      ></component>
      <div v-if="!page.contents.length">
        Hey Content 1
      </div>
    </div>
    <div v-content="page.contents">Hey Content 2</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as DisplayComponents from '~/components/Components';
export default {
  name: 'WildCardPage',
  components: { ...DisplayComponents },
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    ...mapState('whppt-nuxt/site', ['footer']),
  },
  asyncData({ params, store, error, app: { $whppt } }) {
    return Promise.all([store.dispatch('whppt-nuxt/page/loadPage', { slug: params.pathMatch })]).catch(err => {
      error({
        statusCode: (err.response && err.response.status) || 500,
        message: (err.response && err.response.statusText) || 'Unknown Error',
        stack: err.stack,
      });
    });
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.margin {
  margin: 20px 0;
}
</style>
