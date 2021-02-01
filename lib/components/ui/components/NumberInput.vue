<template>
  <div class="whppt-input" :class="{ 'whppt-input--dark': dark }">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="internalValue"
      v-bind="$attrs"
      :name="name"
      type="number"
      :placeholder="placeholder"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <p v-if="info" class="info">{{ info }}</p>
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
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    internalValue: '',
  }),
  watch: {
    internalValue(newVal) {
      if (!newVal) return;
      this.$emit('input', newVal);
    },
  },
  created() {
    this.internalValue = this.value;
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-input {
  width: 100%;

  label {
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
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

  &--dark {
    label {
      color: white;
    }

    input {
      background-color: $gray-900;
      color: white;
      border: 1px solid $gray-500;

      &:focus {
        background-color: $gray-800;
      }
    }
  }
}
</style>
