<template>
  <li class="tabItem">
    <whppt-button :class="{ 'tabItem__button--active': active }" @click="$emit('click')">
      <slot></slot>
    </whppt-button>
  </li>
</template>
<script>
// hover:border-gray-200
import WhpptButton from './WhpptButton';

export default {
  name: 'EditorTab',
  components: { WhpptButton },
  props: { active: Boolean },
};
</script>
<style scoped>
.tabItem__button--active {
  border-width: 1px;
  background-color: white;
  border-color: white;
  color: black;
}
li {
  display: inline-block;
}
</style>
