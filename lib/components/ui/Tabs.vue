<template>
  <md-tabs v-bind="$attrs" @md-changed="$emit('md-changed', $event)">
    <slot></slot>
  </md-tabs>
</template>

<script>
export default {
  name: 'WhpptTabs',
};
</script>

<style scoped></style>
