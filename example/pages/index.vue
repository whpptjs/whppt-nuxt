<template>
  <div class="container">
    <w-rich-text
      v-rich-text="page.content"
      :content="page.content"
    ></w-rich-text>
    <div v-text-box="page3.content" :content="page3.content">
      {{ page3.content.text || 'Text Box' }}
    </div>
    <div v-content="page4.contents">
      <div v-if="page4.contents.length">
        <div
          v-for="(content, index) in page4.contents"
          :key="index"
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
          <!-- {{ content.value || 'Content here' }} -->
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
      page2: { content: { href: '', text: '', type: 'page' } },
      page3: { content: { text: '' } },
      page4: { contents: [] }
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
  height: 200vh;
  background-color: #efefef;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.margin {
  margin: 20px 0;
}
</style>
