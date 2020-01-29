<template>
  <div class="container">
    <w-rich-text
      v-rich-text="page.content"
      :content="page.content"
    ></w-rich-text>
    <w-link v-link="page2.content" :content="page2.content"></w-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: { content: { value: '' } },
      page2: { content: { href: '', text: '', type: '' } }
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
</style>
