<template>
  <div class="whppt-select">
    <label v-if="label" class="whppt-select__label">{{ label }}</label>
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
    valueProp: { type: String, default: () => '' },
    idProp: { type: String, default: () => '' },
  },
  computed: {
    selectedIndex() {
      if (!this.value) return -1;
      return this.items.findIndex(item => {
        if (typeof item === 'object') return item[this.idProp || 'id'] === this.value[this.idProp || 'id'];
        return item === this.value;
      });
    },
  },
  methods: {
    select(event) {
      this.$emit('input', this.items[event.target.value]);
    },
    getValue(item, path) {
      if (typeof item !== 'object') return item;
      if (!path) return item.title || item.label;

      return get(item, path);
    },
  },
};
</script>
<style scoped>
.whppt-select__label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-select__input {
  width: 100%;
  background: black;
  color: white;
  font-size: 16px;
  margin: 5px 0;
  height: 35px;
}

.whppt-select__input:focus {
  outline: none;
}
/* .whppt-select {
  margin: 10px 0;
} */
</style>
