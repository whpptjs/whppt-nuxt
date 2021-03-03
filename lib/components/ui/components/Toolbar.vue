<template>
  <div class="whppt-toolbar" :class="{ 'whppt-toolbar--dark': dark, 'whppt-toolbar--dense': dense }">
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
    dense: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

$gray-200: #edf2f7;
$gray-900: #1a202c;

.whppt-toolbar {
  min-height: 3rem;
  display: flex;
  border-bottom: 2px solid $primary-600;
  padding: 1rem;
  background-color: white;

  &--dark {
    background-color: $gray-900;
    color: white;
  }

  &--dense {
    padding: 0.5rem;
    min-height: 0;
  }
}
</style>
