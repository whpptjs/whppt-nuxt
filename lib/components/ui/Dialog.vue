<template>
  <div class="whppt-dialog" :class="{ 'whppt-dialog__fixed-height': fixedHeight }">
    <div class="whppt-dialog__container">
      <slot></slot>
      <div class="whppt-dialog__actions">
        <slot name="actions"></slot>
      </div>
      <slot name="close"> </slot>
    </div>
    <div class="whppt-dialog__background"></div>
  </div>
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

<style lang="scss" scoped>
.whppt-dialog .md-dialog-container {
  max-width: 950px;
}

.whppt-dialog__fixed-height .md-dialog-container {
  min-height: 80%;
}
</style>
