<template>
  <div class="container">
    <w-rich-text
      v-rich-text="page.content"
      :content="page.content"
    ></w-rich-text>
    <div v-text-box="page.content.text">
      {{ page.content.text || 'Enter Text here' }}
    </div>
    <div v-content="page3.contents">
      <div v-if="page3.contents.length">
        <div
          v-for="content in page3.contents"
          :key="content.key"
          v-move="{ parent: page3, item: content }"
          class="margin"
        >
          <div v-if="content.type === 'wText'" v-text-box="content">
            {{ content.text || 'Enter Text here' }}
          </div>
          <div v-if="content.type === 'wRichText'" v-rich-text="content">
            {{ content.text || 'Enter rich text here' }}
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
  fetch({ params, store, error }) {
    return store
      .dispatch('whppt-nuxt/page/load', { slug: params.pathMatch })
      .catch((err) => {
        error({
          statusCode: (err.response && err.response.status) || 500,
          message: (err.response && err.response.statusText) || 'Unknown Error',
          stack: err.stack
        })
      })
  },
  data() {
    return {
      page: { content: { text: '' } },
      page2: { content: { href: '', text: '', type: '' } },
      page3: { contents: [] }
    }
  },
  methods: {
    editObject() {
      return this.test
    }
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
