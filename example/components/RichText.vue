<template>
  <div
    v-rich-text="value"
    :data-property="value.property"
    :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }"
  >
    <div v-html="value[value.property] || 'Enter Text Here'"></div>
  </div>
</template>
<script>
export default {
  name: 'RichTextDisplay',
  props: ['value'],
};
</script>
