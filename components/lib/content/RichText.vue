<template>
  <div class="richContent">
    <div v-if="!isEmpty" v-html="content.value"></div>
    <div v-if="isEmpty">Enter text here</div>
  </div>
</template>

<script>
const isEmptyValue = val => {
  return !val || val === '' || val === '<p></p>';
};

export default {
  name: 'WhpptRichText',
  props: ['content'],
  computed: {
    isEmpty() {
      return isEmptyValue(this.content.value);
    },
  },
};
</script>
<style scoped>
.richContent {
  width: 100%;
}
</style>
