<template>
  <div>
    <div @click="$emit('click')" class="whppt-checkbox">
      <w-check v-if="value" class="whppt-checkbox-icon"></w-check>
      <w-circle v-if="!value"></w-circle>
      <span class="whppt-checkbox__title">{{ label }}</span>
    </div>
  </div>
  <!-- <button v-if="value" class="whppt-checkbox whppt-icon-button" @click="$emit('click')">
    <w-check></w-check>
    <span class="whppt-checkbox__title">{{ label }}</span>
  </button>
  <button v-else class="whppt-checkbox whppt-icon-button" @click="$emit('click')">
    <w-circle></w-circle>
    <span class="whppt-checkbox__title">{{ label }}</span>
  </button> -->
</template>

<script>
export default {
  name: 'EditorCheckBox',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
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
