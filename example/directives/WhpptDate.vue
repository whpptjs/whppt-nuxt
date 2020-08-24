<template>
  <div v-whppt-date="myComponentData" data-property="date">
    <div>{{ myComponentData.date }}</div>
  </div>
</template>

<script>
export default {
  name: 'WhpptDateDirectiveExample',
  data: () => ({
    myComponentData: {
      date: '',
    },
  }),
};
</script>
