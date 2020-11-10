<template>
  <div class="whppt-checkbox" :class="{ 'whppt-checkbox--dark': dark }">
    <label>
      <span v-if="label" class="whppt-checkbox__label">{{ label }}</span>
      <input
        type="checkbox"
        :checked="value"
        @input="$emit('input', $event.target.checked)"
        @change="$emit('change', $event.target.checked)"
      />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'WhpptCheckbox',
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

$primary-600: #5a67d8;

.whppt-checkbox {
  height: 1rem;

  &__label {
    display: block;
    user-select: none;
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
    letter-spacing: 0.025em;
    font-size: 0.75rem;
  }

  label {
    display: block;
    position: relative;
    cursor: pointer;
    padding: 0.2rem 0 0.2rem 2rem;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:focus + .checkmark {
        border: 2px solid $primary-600;
      }

      &:checked:focus + .checkmark {
        border: 2px solid white;
      }
    }
  }

  &--dark {
    .whppt-checkbox__label {
      color: white;
    }
  }
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1rem;
  width: 1rem;
  background-color: $gray-200;
  border: 2px solid transparent;
  border-radius: 0.25rem;
}

.whppt-checkbox:hover input ~ .checkmark {
  background-color: $gray-500;
}

.whppt-checkbox input:checked ~ .checkmark {
  background-color: $primary-600;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.whppt-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.whppt-checkbox .checkmark:after {
  left: 4px;
  top: 0;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
