<template>
  <div>
    <!-- TODO: Revise inline styles below-->
    <label
      v-if="label"
      class="whppt-inputText__label"
      :style="labelColour ? `color: ${labelColour}` : 'color: white'"
      :for="id"
      >{{ label }}
    </label>
    <input
      :id="id"
      v-bind="$attrs"
      class="whppt-inputText__input"
      :class="{ 'whppt-inputText__disabled': disabled }"
      :type="$attrs.type || 'text'"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <p v-if="info" class="whppt-inputText__info">{{ info }}&nbsp;</p>
  </div>
</template>

<script>
export default {
  name: 'EditorInputText',
  props: {
    id: { type: String, default: () => '' },
    label: { type: String, default: () => '' },
    value: { type: String, default: () => '' },
    info: { type: String, default: () => '' },
    placeholder: { type: String, default: () => '' },
    disabled: { type: Boolean, default: () => false },
    labelColour: { type: String, default: () => undefined },
  },
};
</script>

<style>
.whppt-inputText__label {
  /* color: white; */
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-inputText__input {
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

.whppt-inputText__info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
  white-space: pre-line;
}

.whppt-inputText__disabled {
  cursor: not-allowed;
  background-color: #f1f1f1;
}
</style>
