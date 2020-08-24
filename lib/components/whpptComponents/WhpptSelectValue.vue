<template>
  <div class="whppt-select">
    <label class="whppt-select__label" for="select">{{ label }} </label>
    <select
      id="select"
      :value="selectedIndex"
      :class="{ 'whppt-select__input_alt_bg': dark }"
      class="whppt-select__input"
      v-bind="$attrs"
      @change="select"
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
  name: 'WhpptSelectValue',
  props: {
    items: { type: Array, default: () => [] },
    action: { type: String, default: () => 'Please select ...' },
    label: { type: String, default: () => '' },
    value: { type: [Object, String, Number], default: () => undefined },
    keyProp: { type: String, required: true },
    valueProp: { type: String, default: () => '' },
    dark: { type: Boolean, default: () => false },
  },
  computed: {
    selectedIndex() {
      if (!this.value) return -1;
      return this.items.findIndex(item => {
        if (typeof item === 'object') return item[this.keyProp] === this.value;
        return item === this.value;
      });
    },
  },
  methods: {
    select(event) {
      this.$emit('input', this.items[event.target.value][this.keyProp]);
    },
    getValue(item, path) {
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
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
  margin: 0.2rem 0 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  resize: vertical;
  background: white;
  color: black;
}

.whppt-select__input_alt_bg {
  background: black;
  color: white;
}
</style>
