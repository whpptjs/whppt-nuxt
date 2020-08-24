<template>
  <div v-whppt-formatted-text="myComponentData" data-property="formattedText">
    <div class="richText" v-html="myComponentData.formattedText" />
  </div>
</template>

<script>
export default {
  name: 'WhpptFormattedTextDirectiveExample',
  data: () => ({
    myComponentData: {
      formattedText: '',
    },
  }),
};
</script>
