<template>
  <div v-formatted-text="content" :data-property="content.property">
    <div v-html="content.text || `<p>Enter Formatted Text here</p>`"></div>
  </div>
</template>

<script>
export default {
  name: 'FormattedText',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
