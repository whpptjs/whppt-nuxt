<template>
  <button
    class="whppt-button"
    :class="{
      'whppt-button--danger': danger,
      'whppt-button--flat': flat,
      'whppt-button--dark': dark,
      'whppt-button--round': round,
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'WhpptButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-600: #718096;

$primary-600: #5a67d8;
$danger-600: #e53e3e;

/* Reset browser style */
button {
  font-family: inherit;
  margin: 0;
  overflow: visible; /* Show the overflow in IE, Show the overflow in Edge. */
  text-transform: none;
  -webkit-appearance: button;
  border: none;
  border: 0;
  border-radius: 0.25rem;
  background: #1e88e5;
  color: white;
  font-size: 1rem;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.whppt-button {
  background-color: $primary-600;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s ease;

  &:hover,
  &:focus {
    background-color: darken($primary-600, 20%);
  }

  &:disabled {
    background-color: lighten($primary-600, 20%);
    color: #efefef;
    cursor: not-allowed;
  }

  svg {
    height: 1.5rem;
    display: inline;
  }

  &--flat {
    background-color: transparent;
    box-shadow: none;

    &:hover,
    &:focus {
      background-color: $gray-600;
    }

    &:disabled {
      background-color: lighten($gray-600, 20%);
      color: #efefef;
      cursor: not-allowed;
    }
  }

  &--danger {
    background-color: $danger-600;

    &:hover {
      background-color: darken($danger-600, 20%);
    }

    &:disabled {
      background-color: lighten($danger-600, 20%);
      color: #efefef;
      cursor: not-allowed;
    }
  }

  &--dark {
    color: white;
  }

  &--round {
    border-radius: 10rem;
    padding: 0.5rem;
  }
}
</style>
