<template>
  <div
    v-edit-image="value[value.property]"
    data-sizes='{"desktop":{"width":400,"height":400,"quality":2}}'
    :style="{
      'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px`,
      'background-image': `url('./${value[value.property].imageId}.png')`,
      //'background-image': `url('${value.}')`,
    }"
    class="img"
  ></div>
</template>
<script>
export default {
  name: 'ImageDisplay',
  props: ['value'],
  // computed: {
  //   style() {
  //     return {

  //     }
  //   },
  // },
};
</script>
<style>
.img {
  width: 100%;
  background: tomato;
  height: 100px;
}
</style>
