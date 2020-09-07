<template>
  <div v-whppt-rich-text="content" :data-property="property" v-html="content[property] || 'Insert Text Here'"></div>
</template>

<script>
export default {
  name: 'WhpptRichText',
  props: {
    content: {
      type: Object,
      required: true,
    },
    property: {
      type: String,
      default: () => 'text',
    },
    container: {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>

<style scoped></style>
