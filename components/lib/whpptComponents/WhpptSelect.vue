<template>
  <div class="whppt-select">
    <label v-if="label" class="whppt-select__label">{{ label }}</label>
    <select
      class="whppt-select__input"
      :class="{ 'whppt-select__input_alt_bg': white }"
      @change="select"
      :value="selectedIndex"
    >
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
    value: { type: [Object, String, Number], default: () => undefined },
    valueProp: { type: String, default: () => '' },
    idProp: { type: String, default: () => '' },
    white: { type: Boolean, default: () => false },
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
  height: 2.6rem;
  width: 100%;
  background: black;
  color: white;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
  margin: 0.2rem 0 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  resize: vertical;
}

.whppt-select__input_alt_bg {
  background: white;
  color: black;
}
</style>
