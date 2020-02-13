<template>
  <div class="component-container">
    <div
      class="image-container"
      v-edit-image="value[value.property]"
      data-sizes='{"desktop":{"width":400,"height":400,"quality":2}}'
      :style="{ 'margin-top': `${value.marginTop || $whppt.defaultMarginTop}px` }"
    >
      <img :src="img" class="img" />
    </div>
  </div>
</template>
<script>
import Jimp from 'jimp';
export default {
  name: 'ImageDisplay',
  props: ['value'],
  mounted() {
    return Jimp.read(`./${this.value[this.value.property].imageId}.png`)
      .then(imgJimp => {
        const {
          scale: s,
          // orientation: o,
          startX: x,
          startY: y,
        } = this.value[this.value.property].image.desktop;
        const scale = Number(s);
        // const orientation = Number(o);
        const startX = Number(x);
        const startY = Number(y);
        return (
          imgJimp
            // .resize(100, 4000)
            .scale(scale)
            .crop(-startX, -startY, 400, 400)
            .getBase64Async(Jimp.AUTO)
        );
      })
      .then(img => (this.img = img));
  },
  data() {
    return {
      img: '',
    };
  },
};
</script>
<style>
.component-container {
  display: flex;
  justify-content: center;
}
.image-container {
  height: 400px;
  width: 400px;
  overflow: hidden;
}
.img {
  object-fit: none;
  height: 100%;
  width: 100%;
}
</style>
