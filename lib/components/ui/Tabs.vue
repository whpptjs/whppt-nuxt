<template>
  <md-tabs v-bind="$attrs" class="whppt-tabs" @md-changed="$emit('md-changed', $event)">
    <slot></slot>
  </md-tabs>
</template>

<script>
export default {
  name: 'WhpptTabs',
};
</script>
