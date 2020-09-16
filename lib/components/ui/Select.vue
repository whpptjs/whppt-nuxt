<template>
  <div class="whppt-select__field">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="whppt-select">
      <select :id="id" :value="value || -1" @input="onInput" @change="onChange">
        <option value="-1" selected>{{ placeholder }}</option>
        <option v-for="(item, index) in items" :key="index" :value="setValueProp(item)">{{ setTextProp(item) }}</option>
      </select>
      <div class="icon">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { find } from 'lodash';

export default {
  name: 'WhpptSelect',
  props: {
    id: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Object, Array],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setValueProp(item) {
      if (typeof item === 'string') return item;
      return item[this.itemValue];
    },
    setTextProp(item) {
      if (typeof item === 'string') return item;
      return item[this.itemText];
    },
    onInput(ev) {
      const returnValue = this.returnObject
        ? find(this.items, i => i[this.itemValue] === ev.target.value)
        : ev.target.value;

      this.$emit('input', returnValue);
    },
    onChange(ev) {
      const returnValue = this.returnObject
        ? find(this.items, i => i[this.itemValue] === ev.target.value)
        : ev.target.value;

      this.$emit('change', returnValue);
    },
  },
};
</script>

<style scoped lang="scss">
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;

.whppt-select__field {
  width: 100%;
  margin-bottom: 0.5rem;
}

label {
  display: block;
  text-transform: uppercase;
  color: $gray-700;
  font-weight: bold;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
}

.whppt-select {
  position: relative;

  select {
    color: $gray-700;
    display: block;
    appearance: none;
    width: 100%;
    background-color: $gray-200;
    border: 1px solid $gray-200;
    padding: 1rem 2rem 1rem 0.75rem;
    border-radius: 0.25rem;
    line-height: 1.25;
  }

  select:focus {
    outline: none;
    background: white;
    border-color: $gray-500;
  }

  .icon {
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    color: $gray-700;
  }
}
</style>
