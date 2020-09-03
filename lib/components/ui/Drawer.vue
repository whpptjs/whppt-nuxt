<template>
  <div class="drawer" :class="{ 'drawer--active': active, 'drawer--dark': dark }">
    <div class="drawer__header">
      <slot name="header"></slot>
    </div>
    <div class="drawer__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhpptDrawer',
  props: {
    active: {
      type: Boolean,
      default: () => false,
    },
    dark: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-900: #1a202c;

.drawer {
  width: 0;
  transition: width 0.3s ease;

  &--active {
    width: 480px;
    transition: width 0.3s ease;
  }

  &__content {
    padding: 1rem;
  }
}

.drawer--dark {
  background-color: $gray-900;
}
</style>
