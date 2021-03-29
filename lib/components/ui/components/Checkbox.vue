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
      <span class="whppt-checkbox__checkmark"></span>
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

$checkbox-height: 20px;
$checkbox-width: 20px;

.whppt-checkbox {
  height: $checkbox-height;

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
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 0 0 0 30px;
    height: $checkbox-height;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:focus + .whppt-checkbox__checkmark {
        border: 2px solid $primary-600;
      }

      &:checked:focus + .whppt-checkbox__checkmark {
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

.whppt-checkbox__checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: $checkbox-height;
  width: $checkbox-width;
  background-color: $gray-200;
  border: 2px solid transparent;
  border-radius: 0.25rem;
}

.whppt-checkbox:hover input ~ .whppt-checkbox__checkmark {
  background-color: $gray-500;
}

.whppt-checkbox input:checked ~ .whppt-checkbox__checkmark {
  background-color: $primary-600;
}

.whppt-checkbox__checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.whppt-checkbox input:checked ~ .whppt-checkbox__checkmark:after {
  display: block;
}

.whppt-checkbox .whppt-checkbox__checkmark:after {
  left: 4px;
  top: 0;
  width: 8px;
  height: 13px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
