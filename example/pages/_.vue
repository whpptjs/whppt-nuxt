<template>
  <div class="text-blue-800 relative font-objektiv-mk2 bg-gray-200">
    <header>
      <!-- <desktop-navbar :on-banner-template="page && page.template === 'banner'" /> -->
      <!-- <mobile-navbar class="xl:hidden" /> -->
    </header>
    <component :is="page.template" v-if="page" :page="page" class="page-content"></component>
    <!-- <site-footer /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import meta from '~/components/mixins/meta';
import * as Templates from '~/components/templates';

export default {
  name: 'WildCardPage',
  components: { ...Templates },
  mixins: [meta],
  asyncData({ params, store, error }) {
    return Promise.all([
      store.dispatch('whppt-nuxt/site/loadSiteSettings'),
      store.dispatch('whppt-nuxt/page/loadPage', { slug: params.pathMatch }),
    ]).catch(err => {
      error({
        statusCode: (err.response && err.response.status) || 500,
        message: (err.response && err.response.statusText) || 'Unknown Error',
        stack: err.stack,
      });
    });
  },
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
  },
};
</script>

<style>
.wContainer {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
