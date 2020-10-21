<template>
  <div
    v-whppt-formatted-text="content"
    class="whppt-formatted-text"
    :class="{ container }"
    :data-property="property"
    v-html="content[property] || 'Insert Text Here'"
  ></div>
</template>

<script>
export default {
  name: 'WhpptFormattedText',
  props: {
    content: {
      type: Object,
      required: true,
    },
    property: {
      type: String,
      default: 'text',
    },
    container: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
