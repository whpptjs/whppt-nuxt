<template>
  <div>
    <label
      v-if="label"
      class="whppt-inputTextArea__label"
      :style="labelColour ? `color: ${labelColour}` : 'color: white'"
      :for="id"
      >{{ label }}</label
    >
    <label>
      <textarea
        :id="id"
        v-bind="$attrs"
        class="whppt-inputTextArea__input"
        :rows="rows || '1'"
        :style="adjustable ? '' : 'resize: none'"
        :class="{ 'whppt-inputArea__disabled': disabled }"
        :type="$attrs.type || 'text'"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        @blur="$emit('blur', $event.target.value)"
      />
    </label>
    <p v-if="info" class="whppt-inputTextArea__info">{{ info }}&nbsp;</p>
  </div>
</template>

<script>
export default {
  name: 'EditorInputTextArea',

  props: {
    id: { type: String, default: () => '' },
    label: { type: String, default: () => '' },
    value: { type: [String, Object], default: () => '' },
    info: { type: String, default: () => '' },
    placeholder: { type: String, default: () => '' },
    disabled: { type: Boolean, default: () => false },
    labelColour: { type: String, default: () => '#000' },
    rows: { type: [String, Number], default: () => 5 },
    adjustable: { type: Boolean, default: () => false },
  },
};
</script>

<style scoped>
.whppt-inputTextArea__label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-inputTextArea__input {
  appearance: none;
  display: block;
  width: 100%;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
}

.whppt-inputTextArea__info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.whppt-inputArea__disabled {
  cursor: not-allowed;
  background-color: #f1f1f1;
}
</style>
