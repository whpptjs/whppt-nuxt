<template>
  <div v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WhpptTab',
  props: {
    title: { type: String, required: true, default: () => 'Untitled' },
  },
  data() {
    return {
      active: false,
    };
  },
};
</script>
<style></style>
