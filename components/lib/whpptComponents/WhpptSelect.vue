<template>
  <div class="whppt-select">
    <label>{{ label }}</label>
    <select ref="select" class="whppt-select__input" @change="select" :value="selectedIndex">
      <option :value="-1">
        {{ action }}
      </option>
      <option v-for="(item, index) in items" :key="index" :value="index">
        {{ getValue(item, valueProp) || `Item #${index + 1}` }}
      </option>
    </select>
  </div>
</template>
<script>
import { get } from 'lodash';
export default {
  name: 'WhpptSelect',
  props: {
    items: { type: Array, default: () => [] },
    action: { type: String, default: () => 'Please select ...' },
    label: { type: String, default: () => '' },
    value: { type: Object, default: () => undefined },
    valueProp: { type: String, default: () => null },
  },
  computed: {
    selectedIndex() {
      return this.items.indexOf(this.value);
    },
  },
  methods: {
    select(event) {
      this.$emit('input', this.items[event.target.value]);
    },
    getValue(obj, path) {
      return get(obj, path);
    },
  },
};
</script>
<style>
.whppt-select__input {
  width: 100%;
  background: black;
  color: white;
  font-size: 16px;
  margin: 5px 0;
  height: 35px;
}
.whppt-select {
  margin: 10px 0;
}
</style>
