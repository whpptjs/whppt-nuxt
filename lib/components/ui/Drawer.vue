<template>
  <div class="drawer" :class="{ 'drawer--active': active, 'drawer--dark': dark }">
    <div class="drawer__content-wrapper" :class="{ 'drawer__content-wrapper--active': active }">
      <div class="drawer__header">
        <slot name="header"></slot>
      </div>
      <div class="drawer__content">
        <slot></slot>
      </div>
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
$gray-200: #edf2f7;
$gray-900: #1a202c;

.drawer {
  width: 0;
  transition: width 0.3s ease;
  border-left: 1px solid $gray-200;

  &--active {
    width: 480px;
    transition: width 0.3s ease;
  }

  &__content-wrapper {
    height: 100vh;
    position: fixed;
    width: 0;
    right: 0;
    transition: width 0.3s ease;
    background-color: white;

    &--active {
      width: 480px;
      z-index: 999;
      transition: width 0.3s ease;
    }
  }
}

.drawer--dark {
  background-color: $gray-900;
}
</style>
