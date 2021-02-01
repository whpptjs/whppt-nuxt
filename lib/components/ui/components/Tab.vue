<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WhpptTab',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, required: true },
    dark: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
  },
  data: () => ({
    isActive: false,
  }),
};
</script>
