<template>
  <div>
    <label class="inputText__label" :for="id">{{ label }}</label>
    <input
      :id="id"
      class="inputText__input"
      :class="{ 'editor-disabled': disabled }"
      type="text"
      :placeholder="placeholder"
      :value="value"
      v-bind="$attrs"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <!-- v-on="$listeners" -->
    <p class="inputText__info">{{ info }}&nbsp;</p>
  </div>
</template>

<script>
// Based on https://vuejs.org/v2/examples/modal.html
export default {
  name: 'EditorInputText',
  props: ['id', 'label', 'value', 'info', 'placeholder', 'disabled'],
};
</script>
<style scoped>
.inputText__label {
  color: white;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.inputText__input {
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
.inputText__input:focus {
  outline: none;
}

.inputText__info {
  color: gray;
  font-size: 0.75rem;
  font-style: italic;
  margin-bottom: 0.75rem;
}
</style>
