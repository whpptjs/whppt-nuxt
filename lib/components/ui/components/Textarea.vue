<template>
  <div class="whppt-textarea" :class="{ 'whppt-textarea--dark': dark }">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    ></textarea>
    <p class="info">{{ info }}</p>
    <span v-if="error && typeof error === 'string'" class="whppt-error">{{ error }}</span>
    <div v-if="error && Array.isArray(error)">
      <span v-for="(err, index) in error" :key="index" class="whppt-error">
        {{ err }}<span v-if="index + 1 < error.length">, </span>
      </span>
    </div>
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
    rows: {
      type: [String, Number],
      default: () => 3,
    },
    label: {
      type: String,
      default: () => '',
    },
    info: {
      type: String,
      default: () => '',
    },
    error: { type: [String, Array], default: '' },
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
      default: () => true,
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

$danger-600: #e53e3e;

.whppt-textarea {
  label {
    display: block;
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
    letter-spacing: 0.025em;
    font-size: 0.75rem;
  }

  .whppt-error {
    font-size: 0.75rem;
    color: $danger-600;
  }

  textarea {
    appearance: none;
    display: block;
    width: 100%;
    background-color: $gray-200;
    color: $gray-700;
    border: 1px solid $gray-200;
    border-radius: 0.25rem;
    padding: 1rem 2rem 1rem 0.75rem;
    line-height: 1.25;
    resize: vertical;

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

    textarea {
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
