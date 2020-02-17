<template>
  <div
    v-plain-text="value"
    :data-property="value.property"
    :style="{
      'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px`,
      'text-align': `${value.alignment.value}`,
    }"
  >
    {{ value[value.property] || 'HEY' }}
  </div>
</template>
<script>
export default {
  name: 'PlainTextDisplay',
  props: ['value'],
};
</script>
