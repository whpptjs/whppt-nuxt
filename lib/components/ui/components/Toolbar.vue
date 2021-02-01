<template>
  <div class="toolbar" :class="{ 'toolbar--dark': dark }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WhpptToolbar',
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

$gray-200: #edf2f7;
$gray-900: #1a202c;

.toolbar {
  min-height: 4rem;
  display: flex;
  border-bottom: 2px solid $primary-600;
  padding: 1rem;
  background-color: white;

  &--dark {
    background-color: $gray-900;
    color: white;
  }
}
</style>
