<template>
  <div
    class="whppt-drawer"
    :class="[
      `whppt-drawer--${position}`,
      { 'whppt-drawer--active': active || fixed, 'whppt-drawer--dark': dark, 'whppt-drawer--fixed': fixed },
    ]"
  >
    <div
      class="whppt-drawer__content-wrapper"
      :class="{
        'whppt-drawer__content-wrapper--active': active || fixed,
        'whppt-drawer__content-wrapper--dark': dark,
        'whppt-drawer__content-wrapper--fixed': fixed,
      }"
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
      default: false,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].includes(value);
      },
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

  &--active {
    width: 480px;
    flex-grow: 0;
    flex-shrink: 0;
    transition: width 0.3s ease;
  }

  &--fixed {
    position: fixed;
    width: 350px;
  }

  &--left {
    .whppt-drawer__content-wrapper {
      // border-right: 1px solid $gray-200;
      left: 0;
    }
  }

  &--right {
    .whppt-drawer__content-wrapper {
      // border-left: 1px solid $gray-200;
      right: 0;
    }
  }

  &__content-wrapper {
    height: 100vh;
    position: fixed;
    width: 0;
    transition: width 0.3s ease;
    background-color: white;
    overflow: auto;

    &--dark {
      color: white;
      background-color: $gray-800;
    }

    &--active {
      width: 480px;
      z-index: 999;
      transition: width 0.3s ease;
    }

    &--fixed {
      width: 350px;
      position: static;
    }
  }
}
</style>
