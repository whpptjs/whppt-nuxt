<template>
  <!-- v-model="selected"  -->
  <div class="whppt-select">
    <label for="template">{{ label }}</label>
    <select ref="select" class="whppt-select__input" @change="select">
      <option :value="-1">
        {{ action }}
      </option>
      <option v-for="(item, index) in items" :key="index" :value="index">
        {{ item.title || item.label || `Item #${index + 1}` }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'WhpptSelect',
  mounted() {
    this.syncSelection(this.value);
  },
  props: {
    items: { type: Array, default: () => [] },
    action: { type: String, default: () => 'Please select ...' },
    label: { type: String, default: () => '' },
    value: { type: Number, default: () => -1 },
  },
  // data() {
  //   return {
  //     selectedIndex: 0,
  //   };
  // },
  watch: {
    value(val, old) {
      console.log('TCL: value -> old', old);
      console.log('TCL: value -> val', val);
      if (val !== old) this.syncSelection(val);
    },
  },
  methods: {
    select(event) {
      this.$emit('input', event.target.selectedIndex - 1);
    },
    syncSelection(val) {
      this.$nextTick(() => {
        this.$refs.select.selectedIndex = val + 1;
      });
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
