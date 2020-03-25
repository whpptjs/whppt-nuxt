<template>
  <div>
    This is a Chapters Page!
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as DisplayComponents from '~/components/Components';
import meta from '~/components/mixins/meta';

export default {
  name: 'WildCardPage',
  components: { ...DisplayComponents },
  mixins: [meta],
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
  },
  asyncData({ params, store, error }) {
    return Promise.all([
      // store.dispatch('whppt-nuxt/site/loadSiteSettings'),
      // store.dispatch('whppt-nuxt/page/loadPage', { slug: params.pathMatch }),
      // store.dispatch('whppt-nuxt/site/loadFooter'),
      // store.dispatch('whppt-nuxt/site/loadNav'),
    ]).catch(err => {
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
.wContainer {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
