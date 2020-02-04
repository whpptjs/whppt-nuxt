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
    selected: { type: Boolean, default: false },
  },
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    this.active = this.selected;
  },
};
</script>
<style></style>
