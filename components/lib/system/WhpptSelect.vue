<template>
  <!-- v-model="selected"  -->
  <select class="whppt-select" @change="selectIndex" ref="select">
    <option>
      {{ title }}
    </option>
    <option v-for="(item, index) in items" :key="index">
      {{ item.title || 'Untitled' }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'WhpptSelect',
  data() {
    return {
      selectedIndex: 0,
    };
  },
  methods: {
    selectIndex(e) {
      this.selectedIndex = e.target.selectedIndex;
      this.$emit('input', this.selectedIndex - 1);
    },
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => 'Please select ...',
    },
    value: {
      type: Number,
      default: () => 0,
    },
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
