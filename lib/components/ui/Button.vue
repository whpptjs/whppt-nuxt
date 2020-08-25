<template>
  <md-button v-bind="$attrs" @click="$emit('click')">
    <slot></slot>
  </md-button>
</template>

<script>
export default {
  name: 'WhpptButton',
};
</script>

<style scoped></style>
