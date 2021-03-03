<template>
  <div
    class="whppt-card__outer"
    :class="{ 'whppt-card--content-hidden': !showContent, 'whppt-card__outer--dark': dark }"
  >
    <slot name="header">
      <whppt-toolbar v-if="title" dense class="whppt-card__toolbar">
        <h3 class="whppt-card__title">{{ title }}</h3>
      </whppt-toolbar>
    </slot>
    <div v-if="showContent" class="whppt-card" :class="{ 'whppt-card--dark': dark }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import WhpptToolbar from './Toolbar';

export default {
  name: 'WhpptCard',
  components: {
    WhpptToolbar,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    dark: {
      type: Boolean,
      default: true,
    },
    showContent: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-900: #1a202c;

.whppt-card__outer {
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: white;

  &--dark {
    background-color: $gray-900;
    color: white;
  }
}

.whppt-card {
  padding: 1rem;
  margin-bottom: 1rem;

  &__toolbar {
    border-radius: 0.25rem 0.25rem 0 0;
  }

  &--content-hidden {
    margin-bottom: 1rem;
  }

  &__title {
    font-weight: bold;
  }
}
</style>
