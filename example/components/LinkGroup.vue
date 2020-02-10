<template>
  <div v-link-group="value" :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }">
    {{ value.text || 'Just a normal link group' }}
  </div>
</template>
<script>
export default {
  name: 'LinkGroupDisplay',
  props: ['value'],
};
</script>
