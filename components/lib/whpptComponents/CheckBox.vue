<template>
  <div>
    <div class="whppt-checkbox" @click="$emit('click')">
      <w-check v-if="value" class="whppt-checkbox-icon"></w-check>
      <w-circle v-if="!value"></w-circle>
      <span class="whppt-checkbox__title">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorCheckBox',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    label: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style>
.whppt-checkbox {
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: fit-content;
  cursor: pointer;
}

.whppt-checkbox-icon {
  font-size: 14px;
}

.whppt-checkbox__title {
  font-size: 14px;
  margin-left: 10px;
}
</style>
