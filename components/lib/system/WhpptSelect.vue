<template>
  <!-- v-model="selected"  -->
  <div class="whppt-select">
    <label for="template">Page Template: </label>
    <select ref="select" class="whppt-select__input" @change="selectIndex">
      <option>
        {{ title }}
      </option>
      <option v-for="(item, index) in items" :key="index">
        {{ item.title || item.label || `Item #${index}` }}
      </option>
    </select>
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
    title: {
      type: String,
      default: () => 'Please select ...',
    },
    label: { type: String, default: () => '' },
    value: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  watch: {
    value(val, old) {
      if (val !== old) {
        this.$nextTick(() => {
          this.$refs.select.selectedIndex = val + 1;
        });
      }
    },
  },
  methods: {
    selectIndex(e) {
      this.selectedIndex = e.target.selectedIndex;
      this.$emit('input', this.selectedIndex - 1);
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
  margin: 20px 0;
}
</style>
