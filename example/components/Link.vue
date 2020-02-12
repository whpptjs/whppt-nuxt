<template>
  <div v-link="value" :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }">
    {{ value || 'Just a normal link' }}
  </div>
</template>
<script>
export default {
  name: 'LinkDisplay',
  props: ['value'],
};
</script>
