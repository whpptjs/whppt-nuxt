<template>
  <div v-if="page" class="container">
    <div v-link-group="page.linkgroup">
      {{ (page.linkgroup && page.linkgroup.text) || 'HEY' }}
    </div>
    <div v-link="page.link">
      {{ page.text || 'Enter link here' }}
    </div>
    <div v-plain-text="{ data: page, property: 'title' }">
      {{ page.title || 'HEY' }}
    </div>
    <div v-content="{ data: page.contents }">
      <div v-if="page.contents.length">
        <div v-for="(content, index) in page.contents" :key="index" :style="{ 'margin-top': `${content.marginTop}px` }">
          <div
            v-if="content.displayType === 'wPlainText'"
            v-plain-text="{ data: content, property: 'text' }"
            :style="{ 'margin-top': `${content.marginTop}px` }"
          >
            {{ content.text || 'Enter Text here' }}
          </div>
          <div
            :style="{ 'margin-top': `${content.marginTop}px` }"
            v-if="content.displayType === 'wRichText'"
            v-rich-text="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter rich text here' }}
          </div>
          <div
            :style="{ 'margin-top': `${content.marginTop}px` }"
            v-if="content.displayType === 'wCarousel'"
            v-carousel="{ data: content, property: 'items' }"
          >
            Just a normal carousel
          </div>
          <div
            v-if="content.displayType === 'wCardCarousel'"
            v-carousel="{ data: content, property: 'items' }"
            :style="{ 'margin-top': `${content.marginTop}px` }"
          >
            A super card carousel
          </div>
          <div
            v-if="content.displayType === 'wLink'"
            v-link="content"
            :style="{ 'margin-top': `${content.marginTop}px` }"
          >
            {{ content.text || 'Enter link here' }}
          </div>
          {{ content.type }}
          <div
            v-if="content.displayType === 'wLinkGroup'"
            v-link-group="content.linkGroup"
            :style="{ 'margin-top': `${content.marginTop}px` }"
          >
            <div v-if="content.displayType === 'wPlainText'" v-plain-text="{ data: content, property: 'text' }">
              {{ content.text || 'Enter Text here' }}
            </div>
            <div v-if="content.displayType === 'wRichText'" v-rich-text="{ data: content, property: 'text' }">
              {{ content.text || 'Enter rich text here' }}
            </div>
            <div v-if="content.displayType === 'wCarousel'" v-carousel="{ data: content, property: 'items' }">
              <!-- {{ content.text || 'Enter rich text here' }} -->
              Just a normal carousel
            </div>
            <div v-if="content.displayType === 'wCardCarousel'" v-carousel="{ data: content, property: 'items' }">
              <!-- {{ content.text || 'Enter rich text here' }} -->
              A super card carousel
            </div>
            <div v-if="content.displayType === 'wLink'" v-link="content">
              {{ content.text || 'Enter link here' }}
            </div>
            {{ content.type }}
            <div v-if="content.displayType === 'wLinkGroup'" v-link-group="content.linkGroup">
              {{ (content.linkgroup && content.linkgroup.text) || 'HEY' }}
            </div>
          </div>
          <div v-if="content.displayType === 'wImage'" v-image="{ data: content, property: 'data' }">
            I am an image
          </div>
          <div v-if="content.editorType === 'wContainer'" v-container="{ data: content, property: 'container' }">
            You are a Container.
            <div v-content="{ data: content.contents }" style="width: 400px; height: 300px; background-color: green">
              <div v-for="(ccontent, iindex) in content.contents" :key="iindex" class="margin">
                <div v-if="ccontent.displayType === 'wPlainText'" v-plain-text="{ data: ccontent, property: 'text' }">
                  {{ ccontent.text || 'Enter Text here' }}
                </div>
                <div v-if="ccontent.displayType === 'wRichText'" v-rich-text="{ data: ccontent, property: 'text' }">
                  {{ ccontent.text || 'Enter rich text here' }}
                </div>
              </div>
            </div>
          </div>
          <div
            :style="{ 'margin-top': `${content.marginTop}px` }"
            v-if="content.displayType === 'wListings'"
            v-listings="{ data: content, property: 'categories' }"
          >
            Listings!!
          </div>
        </div>
      </div>
      <div v-else>
        Content hered
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'WildCardPage',

  asyncData({ params, store, error, app: { $whppt } }) {
    return Promise.all([store.dispatch('whppt-nuxt/page/loadPage', { slug: params.pathMatch })]).catch(err => {
      error({
        statusCode: (err.response && err.response.status) || 500,
        message: (err.response && err.response.statusText) || 'Unknown Error',
        stack: err.stack,
      });
    });
  },
  data() {
    return {
      componentList: ['wPlainText', 'wRichText'],
    };
  },
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
    ...mapState('whppt-nuxt/site', ['footer']),
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
