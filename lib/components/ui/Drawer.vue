<template>
  <div class="drawer" :class="{ 'drawer--active': active }">
    <slot></slot>
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
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  width: 0;

  &--active {
    width: 30vw;
  }
}
</style>
