<template>
  <div class="whppt-card" :class="{ 'whppt-card--dark': dark }">
    <h3 v-if="title" class="whppt-card__title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WhpptCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-900: #1a202c;

.whppt-card {
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius: 0.25rem;

  &--dark {
    background-color: $gray-900;
    color: white;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
}
</style>
