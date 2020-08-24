<template>
  <div>
    <!-- Simple use -->
    <div v-whppt-text="myText">{{ myText }}</div>
    <!-- With data attribute -->
    <div v-whppt-text="content" data-property="myProperty">{{ myText }}</div>
  </div>
</template>
<script>
export default {
  name: 'MyComponent',
  data: () => ({
    myText: '',
    content: {
      myProperty: '',
    },
  }),
};
</script>
