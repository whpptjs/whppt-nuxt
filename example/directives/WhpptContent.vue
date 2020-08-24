<template>
  <div v-whppt-content="myComponentData.content" data-whitelist="Anchor">
    <div v-for="(content, index) in myComponentData.content" :key="index">
      <component :is="content.displayType" :content="content"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptDateDirectiveExample',
  data: () => ({
    myComponentData: {
      content: [],
    },
  }),
};
</script>
