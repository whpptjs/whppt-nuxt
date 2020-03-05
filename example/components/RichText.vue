<template>
  <div v-rich-text="value" :data-property="value.property" :style="{ 'margin-top': `${marginTop}rem` }">
    <div v-html="value[value.property] || 'Enter Text Here'"></div>
  </div>
</template>
<script>
export default {
  name: 'RichTextDisplay',
  props: ['value'],
  computed: {
    marginTop() {
      return this.$whppt.spacing(this.value.marginTop || this.$whppt.defaultMarginTop);
    },
  },
};
</script>
