<template>
  <div
    class="split-content-container"
    v-blank="value"
    :data-property="value.property"
    :style="{
      'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px`,
      container: value.inContainer,
    }"
  >
    <div v-plain-text="value">
      Text
    </div>
    <div>
      Image
    </div>
  </div>
</template>
<script>
export default {
  name: 'CarouselDisplay',
  props: ['value'],
};
</script>
<style>
.split-content-container {
  background: tomato;
  display: flex;
  align-items: center;
}
</style>
