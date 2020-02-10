<template>
  <div
    v-carousel="value"
    :data-property="value.property"
    :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }"
  >
    {{ value || 'Just a normal carousel' }}
  </div>
</template>
<script>
export default {
  name: 'CarouselDisplay',
  props: ['value'],
};
</script>
