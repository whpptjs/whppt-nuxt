<template>
  <div class="whppt-drawer" :class="{ 'whppt-drawer--active': active, 'whppt-drawer--dark': dark }">
    <div
      class="whppt-drawer__content-wrapper"
      :class="{ 'whppt-drawer__content-wrapper--dark': dark, 'whppt-drawer__content-wrapper--active': active }"
    >
      <div class="whppt-drawer__header">
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
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-100: #f7fafc;
$gray-200: #edf2f7;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-drawer {
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

    &--dark {
      color: white;
      background-color: $gray-800;
    }

    &--active {
      width: 480px;
      z-index: 999;
      transition: width 0.3s ease;
    }
  }
}
</style>
