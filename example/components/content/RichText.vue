<template>
  <div v-rich-text="content" :data-property="content.property" :class="{ container }">
    <div
      class="richText text-blue-900 w-12/12"
      :class="{ 'mx-remove': !container }"
      v-html="content.text || `<p>Enter Rich Text here</p>`"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'RichText',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
    container: Boolean,
  },
};
</script>
