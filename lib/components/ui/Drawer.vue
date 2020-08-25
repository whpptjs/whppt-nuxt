<template>
  <md-drawer v-bind="$attrs">
    <slot></slot>
  </md-drawer>
</template>

<script>
export default {
  name: 'WhpptDrawer',
  props: {},
};
</script>
