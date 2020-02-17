<template>
  <div v-if="page" class="h-screen wContainer">
    <div v-plain-text="page">
      {{ page.title || 'Plain Text' }}
    </div>
    <whppt-link :to="{ href: '/' }">Whppt Link</whppt-link>
    <div v-content="page.contents">
      Content Block 2
      <component
        :is="content.displayType"
        v-for="(content, contentKey) in page.contents"
        :key="`content-${contentKey}`"
        :value="content"
        :class="{ container: content.inContainer, 'mx-auto': content.inContainer }"
        :style="{ 'margin-top': `${content.marginTop || $whppt.defaultMarginTop}px` }"
      ></component>
    </div>
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
.wContainer {
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

<!--
    <div v-content="page.contents" data-components="wPlainText, wRichText, wEditImage" class="whppt-contents">
      <component
        :is="content.displayType"
        v-for="(content, index) in page.contents"
        :key="index"
        :value="content"
        :class="{ container: content.inContainer }"
        :style="{ 'margin-top': `${content.marginTop || $whppt.defaultMarginTop}px` }"
      ></component>
      <div v-for="(content, index) in page.contents" :key="index">{{ content }}</div>
      <div v-if="!page.contents">
        Content Block (Limited)
      </div>
    </div>
-->
