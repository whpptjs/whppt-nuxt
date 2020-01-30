<template>
  <div class="container">
    <w-rich-text
      v-rich-text="page.content"
      :content="page.content"
    ></w-rich-text>
    <w-link v-link="page2.content" :content="page2.content"></w-link>
    <div v-content="page3.contents">
      <div v-if="page3.contents.length">
        <div
          v-for="content in page3.contents"
          :key="content.key"
          v-move="{ parent: page3, item: content }"
          class="margin"
        >
          {{ content.value || 'Content here' }}
        </div>
      </div>
      <div v-else>
        Content here
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetch({ store, error }) {
    return store
      .dispatch('whppt-nuxt/page/load', { slug: 'home' })
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
