<template>
  <div
    v-image="value"
    :data-property="value.property"
    :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }"
    class="img"
  ></div>
</template>
<script>
export default {
  name: 'ImageDisplay',
  props: ['value'],
};
</script>
<style>
.img {
  width: 100%;
  background: red;
  height: 100px;
}
</style>
