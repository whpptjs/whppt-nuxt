<template>
  <li class="whppt-tab-item">
    <whppt-button :class="{ 'whppt-tab-item__button--active': active }" @click="$emit('click')">
      <slot></slot>
    </whppt-button>
  </li>
</template>

<script>
import WhpptButton from './WhpptButton';

export default {
  name: 'EditorTab',
  components: { WhpptButton },
  props: { active: Boolean },
};
</script>

<style scoped>
.whppt-tab-item__button--active {
  border-width: 1px;
  background-color: white;
  border-color: white;
  color: black;
}
.whppt-tab-item {
  display: inline-block;
}
</style>
