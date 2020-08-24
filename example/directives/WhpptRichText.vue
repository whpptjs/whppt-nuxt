<template>
  <div
    v-whppt-formatted-text="myComponentData"
    data-property="richText"
    data-hide-menu
    data-hide-style
    data-hide-headers
    data-hide-lists
    data-hide-links
    class="w-full h-40 bg-purple-500"
  >
    <div v-html="myComponentData.richText" />
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data: () => ({
    myComponentData: {
      richText: '',
    },
  }),
};
</script>
