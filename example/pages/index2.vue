<template>
  <div class="container">
    <w-rich-text
      v-rich-text="{ data: page.content, property: 'text' }"
      :content="page.content.value"
    ></w-rich-text>
    <div v-link="{ data: page2, property: 'content' }">
      {{ page2.content || 'Link' }}
    </div>
    <div
      v-text-box="{ data: page3.content, property: 'text' }"
      :content="page3.content"
    >
      {{ page3.content.text || 'Text Box' }}
    </div>
    <div v-content="{ data: page4, property: 'contents' }">
      <div v-if="page4.contents.length">
        <div
          v-for="(content, index) in page4.contents"
          :key="index"
          class="margin"
        >
          <div
            v-if="content.type === 'wText'"
            v-text-box="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter Text here' }}
          </div>
          <div
            v-if="content.type === '≈'"
            v-rich-text="{ data: content, property: 'text' }"
          >
            {{ content.text || 'Enter rich text here~~~~~' }}
          </div>
          <div
            v-if="content.type === 'wCardCarousel'"
            v-card-carousel="{ data: content, property: 'data' }"
          >
            <!-- {{ content.text || 'Enter rich text here' }} -->
            Just placeholder
          </div>
          <div v-if="content.type === 'wLink'" v-link="content">
            {{ content.link || 'Enter link here' }}
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
  name: 'LandingPage',
  // fetch({ store, error }) {
  //   return store
  //     .dispatch('whppt-nuxt/page/load', { slug: 'home' })
  //     .catch((err) => {
  //       error({
  //         statusCode: (err.response && err.response.status) || 500,
  //         message: (err.response && err.response.statusText) || 'Unknown Error',
  //         stack: err.stack
  //       })
  //     })
  // },
  data() {
    return {
      page: {
        header: { title: { text: '' }, subtitle: { text: '' }, image: {} },
        header2: { title: '', subtitle: '', image: {} },
        contents: [{ value: '' }]
      },
      page2: {
        content: { href: '', text: '', type: 'page' }
      },
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
