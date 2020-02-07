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
    <div v-content="page.contents">
      <div v-if="page.contents.length">
        <div v-for="content in page.contents" :key="content.key" class="margin">
          <div
            v-if="content.displayType === 'wPlainText'"
            v-plain-text="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter Text here' }}
          </div>
          <div
            v-if="content.displayType === 'wRichText'"
            v-rich-text="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter rich text here' }}
          </div>
          <div
            v-if="content.displayType === 'wCarousel'"
            v-carousel="{ data: content, property: 'items' }"
          >
            <!-- {{ content.text || 'Enter rich text here' }} -->
            Just a normal carousel
          </div>
          <div
            v-if="content.displayType === 'wCardCarousel'"
            v-carousel="{ data: content, property: 'items' }"
          >
            <!-- {{ content.text || 'Enter rich text here' }} -->
            A super card carousel
          </div>
          <div v-if="content.displayType === 'wLink'" v-link="content">
            {{ content.text || 'Enter link here' }}
          </div>
          {{ content.type }}
          <div
            v-if="content.displayType === 'wLinkGroup'"
            v-link-group="content.linkGroup"
          >
            {{ (content.linkgroup && content.linkgroup.text) || 'HEY' }}
          </div>
          <div
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
export default {
  name: 'WildCardPage',
  asyncData({ params, store, error, app: { $whppt } }) {
    return Promise.all([
      $whppt.loadPage({ slug: params.pathMatch }),
      $whppt.loadFooter()
    ])
      .then(([page]) => {
        return { page }
      })
      .catch((err) => {
        error({
          statusCode: (err.response && err.response.status) || 500,
          message: (err.response && err.response.statusText) || 'Unknown Error',
          stack: err.stack
        })
      })
  },
  mounted() {
    this.$whppt.page = this.page
  }
}
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
