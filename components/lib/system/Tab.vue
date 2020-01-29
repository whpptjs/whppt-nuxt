<template>
  <li class="tabItem">
    <button class="tabItem__button" :class="{ 'tabItem__button--active': active }" href="#" @click="$emit('click')">
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

.tabItem__button {
  display: inline-block;
  color: white;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: black;
}

.tabItem__button:hover {
  background-color: #eee;
  color: black;
}
.tabItem__button:focus {
  outline: none;
}

.tabItem__button--active {
  border-width: 1px;
  background-color: white;
  border-color: white;
  color: black;
}
</style>
