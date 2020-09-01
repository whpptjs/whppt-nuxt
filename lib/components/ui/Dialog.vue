<template>
  <md-dialog
    class="whppt-dialog"
    :class="{ 'whppt-dialog__fixed-height': fixedHeight }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <md-dialog-content>
      <slot></slot>
    </md-dialog-content>
    <md-dialog-actions>
      <slot name="actions"></slot>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: 'WhpptDialog',
  props: {
    fixedHeight: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style>
.whppt-dialog .md-dialog-container {
  max-width: 950px;
}

.whppt-dialog__fixed-height .md-dialog-container {
  min-height: 80%;
}
</style>
