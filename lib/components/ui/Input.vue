<template>
  <div class="whppt__input" :class="{ 'whppt__input--dark': dark }">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :name="name"
      :type="type"
      class=""
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <p class="info">{{ info }}</p>
  </div>
</template>

<script>
export default {
  name: 'WhpptInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: () => undefined,
    },
    type: {
      type: String,
      default: () => 'text',
    },
    label: {
      type: String,
      default: () => '',
    },
    info: {
      type: String,
      default: () => '',
    },
    value: {
      type: String,
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    dark: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;

.whppt__input {
  label {
    display: block;
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
    margin-bottom: 0.5rem;
    letter-spacing: 0.025em;
    font-size: 0.75rem;
  }

  input {
    appearance: none;
    display: block;
    width: 100%;
    background-color: $gray-200;
    color: $gray-700;
    border: 1px solid $gray-200;
    border-radius: 0.25rem;
    padding: 1rem 2rem 1rem 0.75rem;
    line-height: 1.25;

    &:focus {
      outline: none;
      background-color: white;
      border-color: $gray-500;
    }
  }

  .info {
    font-size: 0.75rem;
    font-style: italic;
    color: $gray-500;
  }
}

.whppt__input--dark {
}
</style>
