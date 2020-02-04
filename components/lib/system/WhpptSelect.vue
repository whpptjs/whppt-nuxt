<template>
  <select class="whppt-select">
    <option @click="$emit('select')">
      {{ title }}
    </option>
    <option v-for="(item, index) in items" :key="index" @click="$emit('select', item)">
      {{ item }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'WhpptSelect',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => 'Please select ...',
    },
  },
};
</script>
<style>
.whppt-select {
  width: 100%;
  background: black;
  color: white;
  font-size: 16px;
  margin: 20px 0;
}
</style>
