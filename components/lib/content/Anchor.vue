<template>
  <div :id="content.id" v-whppt-anchor="content" data-property="id">
    <!--TODO, only show content if in draft mode -->
    <p>Anchor with ID: {{ content.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'WhpptAnchor',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>
