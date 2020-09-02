<template>
  <div>
    <label v-if="label">
      <span class="label">{{ label }}</span>
      <select @input="$emit('input', $event.target.value)" @change="$emit('change', $event.target.value)">
        <option value="-1">{{ placeholder }}</option>
        <option v-for="(item, index) in items" :key="index" :value="setValueProp(item)">{{ setTextProp(item) }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'WhpptSelect',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    info: {
      type: String,
      default: () => '',
    },
    itemText: {
      type: String,
      default: () => 'text',
    },
    itemValue: {
      type: String,
      default: () => 'value',
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
  },
};
</script>

<style scoped lang="scss">
select {
  color: black;
}
</style>
