<template>
  <div>
    <div v-if="page" class="h-screen wContainer">
      <div class="my-8">
        <h2 id="plain-text" class="font-bold underline">Plain Text Example</h2>
        <div v-plain-text="page">
          {{ page.title || 'Plain Text' }}
        </div>
      </div>
      <div class="my-8" v-if="page.link">
        <h2 id="whppt-link" class="font-bold underline">Whppt Link Example</h2>
        <whppt-link v-link="page.link" :to="page.link">
          {{ page.link.text || 'Whppt Link' }}
        </whppt-link>
      </div>
      <div class="my-8">
        <h2 id="contents" class="font-bold underline">Content Example</h2>
        <div v-content="page.contents" data-blacklist="" class="p-8">
          <component
            :is="content.displayType"
            v-for="(content, contentKey) in page.contents"
            :key="`content-${contentKey}`"
            :value="content"
            :content="content"
            :class="{ container: content.inContainer, 'mx-auto': content.inContainer }"
            :style="{ 'margin-top': `${content.marginTop || $whppt.defaultMarginTop}px` }"
          ></component>
        </div>
      </div>
    </div>
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
      store.dispatch('whppt-nuxt/page/loadPage', { slug: params.pathMatch }),
      store.dispatch('whppt-nuxt/site/loadFooter'),
      store.dispatch('whppt-nuxt/site/loadNav'),
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
