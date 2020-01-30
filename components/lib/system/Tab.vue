<template>
  <li class="tabItem">
    <button class="whppt-button" :class="{ 'tabItem__button--active': active }" href="#" @click="$emit('click')">
      <slot></slot>
    </button>
  </li>
</template>
<script>
// hover:border-gray-200

export default {
  name: 'EditorTab',
  props: { active: Boolean },
  computed: {
    classes() {
      return {
        'text-blue-500': !this.active,
        'hover:bg-gray-200': !this.active,

        'text-white': this.active,
        'bg-blue-500': this.active,
        border: this.active,
        'border-blue-500': this.active,
      };
    },
  },
};
</script>
<style scoped>
.tabItem {
  display: block;
  margin-right: 0.75rem;
  color: white;
}

.tabItem__button--active {
  border-width: 1px;
  background-color: white;
  border-color: white;
  color: black;
}
</style>
