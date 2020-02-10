<template>
  <button class="whppt-checkbox whppt-icon-button" @click="$emit('click')">
    <w-check v-if="value"></w-check>
    <w-circle v-if="!value"></w-circle>
    <span class="whppt-checkbox__title">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'EditorCheckBox',
  props: ['value', 'label'],
};
</script>
<style>
.whppt-checkbox {
  display: inline-flex;
  align-items: center;
  margin: 10px 0;
}
.whppt-checkbox__title {
  font-size: 14px;
  margin-left: 10px;
}
</style>
