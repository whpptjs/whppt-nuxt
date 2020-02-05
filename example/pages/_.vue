<template>
  <div v-if="page" class="container">
    <div v-text-box="{ data: page, property: 'title' }">
      {{ page.title || 'HEY' }}
    </div>
    <div v-content="page.contents">
      <div v-if="page.contents.length">
        <div v-for="content in page.contents" :key="content.key" class="margin">
          <div
            v-if="content.type === 'wText'"
            v-text-box="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter Text here' }}
          </div>
          <div
            v-if="content.type === 'wRichText'"
            v-rich-text="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter rich text here' }}
          </div>
          <div
            v-if="content.type === 'wCardCarousel'"
            v-card-carousel="{ data: content, property: 'items' }"
          >
            <!-- {{ content.text || 'Enter rich text here' }} -->
            Just placeholder
          </div>
          <div v-if="content.type === 'wLink'" v-link="content">
            {{ content.text || 'Enter link here' }}
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
    return $whppt
      .loadPage({ slug: params.pathMatch })
      .then((page) => {
        return { page }
      })
      .catch((err) => {
        error({
          statusCode: (err.response && err.response.status) || 500,
          message: (err.response && err.response.statusText) || 'Unknown Error',
          stack: err.stack
        })
      })
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
