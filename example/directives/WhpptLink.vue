<template>
  <div v-whppt-link="myComponentData.link">
    <whppt-link :to="myComponentData.link">{{ content.link.text }}</whppt-link>
  </div>
</template>

<script>
export default {
  name: 'WhpptLinkDirectiveExample',
  data: () => ({
    myComponentData: {
      link: { text: 'About', href: '/about', type: 'page' },
    },
  }),
};
</script>
