<template>
  <div
    v-listings="value"
    :data-property="value.property"
    :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }"
  >
    {{ value[value.property] || 'Listings!!' }}
  </div>
</template>
<script>
export default {
  name: 'ListingsDisplay',
  props: ['value'],
};
</script>
