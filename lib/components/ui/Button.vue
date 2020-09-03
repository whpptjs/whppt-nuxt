<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'WhpptButton',
};
</script>

<style lang="scss" scoped>
$indigo-600: #5a67d8;
$indigo-700: #4c51bf;

button {
  color: white;
  background-color: $indigo-600;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  // hover:bg-purple-400 focus:shadow-outline focus:outline-none

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
}
</style>
