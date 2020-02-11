<template>
  <!-- data-sizes="{ "desktop" :{"w":1920,"h":450,"scale":3}}" -->
  <div
    v-edit-image="value"
    data-sizes=""
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
