<template>
  <div class="whppt-richContent">
    <div v-html="content.text || 'Enter Text Here'"></div>
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
      return isEmptyValue(this.content.text);
    },
  },
};
</script>
<style scoped>
.whppt-richContent {
  width: 100%;
}
</style>
