<template>
  <button class="whppt-button" :class="{ danger }" :disabled="disabled" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'WhpptButton',
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
    danger: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;
$danger-600: #e53e3e;

button {
  color: white;
  background-color: $primary-600;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
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
}

.danger {
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
</style>
